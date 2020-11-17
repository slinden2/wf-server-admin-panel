import { promises as fs } from "fs";
import path from "path";
import { createConnection, Connection } from "typeorm";

import { Server } from "../entity/Server";
import config from "../config";
import { ServerData } from "../types/ServerData";

let connection: Connection;

export const updateServers = async () => {
  if (require.main === module) {
    connection = await createConnection(config.sqlite.connParams);
  }

  const dir = await fs.readdir(config.servers.pidPath);
  const pidFiles = dir.filter((file) => path.extname(file) === ".pid");

  const currentServers = await Promise.all(
    pidFiles.map(
      async (fileName): Promise<ServerData> => {
        const pid = await fs.readFile(`${config.servers.pidPath}/${fileName}`, {
          encoding: "utf-8",
        });

        return {
          fileName,
          pid: Number(pid),
        };
      }
    )
  );

  const serversInDb = await Server.find();

  // Check if there are new servers to add in the pid directory
  const serversToAdd = currentServers.filter(
    (curServer) =>
      !serversInDb.find(
        (dbServer) =>
          dbServer.name === path.basename(curServer.fileName, ".pid")
      )
  );

  // Add new servers
  if (serversToAdd.length) {
    const newServers = serversToAdd.map((server) => {
      const newServer = new Server();
      newServer.name = path.basename(server.fileName, ".pid");
      newServer.pid = server.pid;
      return newServer;
    });

    await Server.insert(newServers);
  }

  // Check if there are changed pids and update them
  const serversToUpdate: Promise<Server>[] = [];
  for (const curServer of currentServers) {
    const serverInDb = serversInDb.find(
      (serverDb) => serverDb.name === path.basename(curServer.fileName, ".pid")
    );

    if (serverInDb && serverInDb.pid !== curServer.pid) {
      serverInDb.pid = curServer.pid;
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
