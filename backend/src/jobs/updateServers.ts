import { promises as fs } from "fs";
import path from "path";
import { createConnection, Connection } from "typeorm";

import { Server } from "../entity/Server";
import config from "../config";
import { ServerData } from "../types/ServerData";
import { getLabbeServers } from "./updateServers/getLabbeServers";
import { readFile } from "../utils/readFile";
import { getConfigProperty } from "./updateServers/getConfigProperty";

let connection: Connection;

export const updateServers = async () => {
  if (require.main === module) {
    connection = await createConnection(config.sqlite.connParams);
  }

  const dir = await fs.readdir(config.servers.pidPath);
  const pidFiles = dir.filter((file) => path.extname(file) === ".pid");
  const labbeServers = await getLabbeServers();

  const currentServers = await Promise.all(
    pidFiles.map(
      async (fileName): Promise<ServerData> => {
        const pid = await fs.readFile(`${config.servers.pidPath}/${fileName}`, {
          encoding: "utf-8",
        });

        return {
          name: path.basename(fileName, ".pid"),
          pid: Number(pid),
        };
      }
    )
  );

  const serversInDb = await Server.find();

  // Check if there are new servers to add in the pid directory
  const serversToAdd = currentServers.filter(
    (curServer) =>
      !serversInDb.find((dbServer) => dbServer.name === curServer.name)
  );

  // Add new servers
  if (serversToAdd.length) {
    const newServers = serversToAdd.map((server) => {
      const confFile = readFile(`${server.name}.cfg`);
      const gamePort = getConfigProperty("game_port", confFile);
      const maxPlayersCount = getConfigProperty("max_players", confFile);
      const newServer = new Server();
      newServer.name = server.name;
      newServer.pid = server.pid;
      newServer.gamePort = Number(gamePort);
      newServer.playerCount = 0;
      newServer.maxPlayerCount = Number(maxPlayersCount);
      newServer.startedDate = new Date();
      return newServer;
    });

    await Server.insert(newServers);
  }

  // Check if server PID, player count or max player counts have changed
  // and update them
  const serversToUpdate: Promise<Server>[] = [];
  for (const curServer of currentServers) {
    const serverInDb = serversInDb.find(
      (serverDb) => serverDb.name === curServer.name
    );

    if (!serverInDb) {
      return;
    }

    const steamServer = labbeServers.find(
      (lsrv) => lsrv.gamePort === serverInDb.gamePort
    );

    const confFile = readFile(`${serverInDb.name}.cfg`);
    const maxPlayerCount = Number(getConfigProperty("max_players", confFile));

    if (
      serverInDb.pid !== curServer.pid ||
      serverInDb.playerCount !== steamServer?.players ||
      serverInDb.maxPlayerCount !== maxPlayerCount
    ) {
      if (serverInDb.pid !== curServer.pid) {
        serverInDb.startedDate = new Date();
      }
      serverInDb.pid = curServer.pid;
      serverInDb.playerCount = steamServer?.players || 0;
      serverInDb.maxPlayerCount = maxPlayerCount;
      serversToUpdate.push(serverInDb.save());
    }
  }

  await Promise.all(serversToUpdate);
};

if (require.main === module) {
  updateServers()
    .then(async () => {
      await connection.close();
      process.exit(0);
    })
    .catch(async (e) => {
      await connection.close();
      // eslint-disable-next-line no-console
      console.error(e.message);
      process.exit(1);
    });
}
