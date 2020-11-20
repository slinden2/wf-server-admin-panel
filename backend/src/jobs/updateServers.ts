import { promises as fs } from "fs";
import path from "path";
import { createConnection, Connection } from "typeorm";

import { Server } from "../entity/Server";
import config from "../config";
import { ServerData } from "../types/ServerData";
import { getPlayerCount } from "./updateServers/getPlayerCount";
import { getMaxPlayerCount } from "./updateServers/getMaxPlayerCount";
import { ServerPlayerCount } from "../types/ServerPlayerCount";

let connection: Connection;

export const updateServers = async () => {
  if (require.main === module) {
    connection = await createConnection(config.sqlite.connParams);
  }

  const dir = await fs.readdir(config.servers.pidPath);
  const pidFiles = dir.filter((file) => path.extname(file) === ".pid");
  const playersFiles = dir.filter((file) => path.extname(file) === ".players");

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

  const currentPlayerCounts = await Promise.all(
    playersFiles.map(
      async (fileName): Promise<ServerPlayerCount> => {
        const fileBasename = path.basename(fileName, ".players");

        // Read player file
        const playerFile = await fs.readFile(
          `${config.servers.pidPath}/${fileName}`,
          { encoding: "utf-8" }
        );
        // Get player count from player file
        const playerCount = getPlayerCount(playerFile);

        // Read config file
        const configFileName = `${fileBasename}.cfg`;
        const configFile = await fs.readFile(
          `${config.servers.pidPath}/${configFileName}`,
          { encoding: "utf-8" }
        );
        // Get max_players from config file
        const maxPlayerCount = getMaxPlayerCount(configFile);

        return {
          name: fileBasename,
          count: playerCount,
          maxCount: maxPlayerCount,
        };
      }
    )
  );

  const currentServerData: Array<
    ServerData & ServerPlayerCount
  > = currentServers.map((csrv) => {
    const playerCountData = currentPlayerCounts.find((pcount) => {
      return pcount.name === csrv.name;
    });
    if (!playerCountData) {
      throw new Error(`No .players file found for server: ${csrv.name}`);
    }

    return {
      ...csrv,
      count: playerCountData.count,
      maxCount: playerCountData.maxCount,
    };
  });

  const serversInDb = await Server.find();

  // Check if there are new servers to add in the pid directory
  const serversToAdd = currentServerData.filter(
    (curServer) =>
      !serversInDb.find((dbServer) => dbServer.name === curServer.name)
  );

  // Add new servers
  if (serversToAdd.length) {
    const newServers = serversToAdd.map((server) => {
      const newServer = new Server();
      newServer.name = server.name;
      newServer.pid = server.pid;
      newServer.playerCount = server.count;
      newServer.maxPlayerCount = server.maxCount;
      return newServer;
    });

    await Server.insert(newServers);
  }

  // Check if server PID, player count or max player counts have changed
  // and update them
  const serversToUpdate: Promise<Server>[] = [];
  for (const curServer of currentServerData) {
    const serverInDb = serversInDb.find(
      (serverDb) => serverDb.name === curServer.name
    );

    if (!serverInDb) {
      return;
    }

    if (
      serverInDb.pid !== curServer.pid ||
      serverInDb.playerCount !== curServer.count ||
      serverInDb.maxPlayerCount !== curServer.maxCount
    ) {
      serverInDb.pid = curServer.pid;
      (serverInDb.playerCount = curServer.count),
        (serverInDb.maxPlayerCount = curServer.maxCount);
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
