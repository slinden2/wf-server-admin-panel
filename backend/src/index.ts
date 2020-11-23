import "reflect-metadata";
import http from "http";
import https from "https";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import path from "path";

import config from "./config";
import { createSchema } from "./utils/createSchema";
import { updateServers } from "./jobs/updateServers";

console.log("config", config);

const main = async () => {
  await createConnection(config.sqlite.connParams);

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      return { req, res };
    },
  });

  const app = express();

  app.use(cors());

  apolloServer.applyMiddleware({ app, cors: false });

  if (config.env === "production") {
    app.use(express.static(path.join(__dirname, "client")));
    app.use(
      "/.well-known/pki-validation",
      express.static(path.join(__dirname, "cert"))
    );
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "index.html"));
    });
  }

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(config.servers.certOptions, app);

  httpServer.listen(config.servers.httpPort, () => {
    // eslint-disable-next-line no-console
    console.log(
      `HTTP server ready at http://localhost:${config.servers.httpPort}${apolloServer.graphqlPath}`
    );

    updateServers();

    setInterval(() => {
      updateServers();
    }, 60000);
  });

  httpsServer.listen(config.servers.httpsPort, () => {
    // eslint-disable-next-line no-console
    console.log(
      `HTTPS server ready at https://localhost:${config.servers.httpsPort}${apolloServer.graphqlPath}`
    );
  });
};

main();
