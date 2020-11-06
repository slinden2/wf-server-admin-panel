import { ConnectionOptions } from "typeorm";
import { isEnvironment } from "./utils/typeGuards";

const _env = process.env.NODE_ENV;
const _port = process.env.WFAP_PORT;

if (!isEnvironment(_env)) {
  throw new Error("NODE_ENV must be either 'development' or 'production'");
}

const env = _env;
const port = Number(_port) || 4000;

const connParams: ConnectionOptions = {
  type: "sqlite",
  database: env === "production" ? "./db.sqlite" : "./db-dev.sqlite",
  entities: [__dirname + "/entity/*.ts"],
  synchronize: env === "development" ? true : false,
  logging: env === "development" ? true : false,
};

export default {
  env,
  sqlite: {
    connParams,
  },
  port,
};
