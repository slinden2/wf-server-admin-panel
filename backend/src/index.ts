import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import path from "path";

import config from "./config";
import { createSchema } from "./utils/createSchema";
import { updateServers } from "./jobs/updateServers";

console.log(config);

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
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "index.html"));
    });
  }

  const port = config.port;

  app.listen({ port }, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );

    updateServers();

    setInterval(() => {
      updateServers();
    }, 60000);
  });
};

main();
