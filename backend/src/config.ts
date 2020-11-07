import { ConnectionOptions } from "typeorm";
import { isEnvironment } from "./utils/typeGuards";

const _env = process.env.NODE_ENV;
const _port = process.env.WFAP_PORT;
const _discordClientId = process.env.WFAP_DISCORD_CLIENT_ID;
const _discordClientSecret = process.env.WFAP_DISCORD_CLIENT_SECRET;
const _discordRedirectUri = process.env.WFAP_DISCORD_REDIRECT_URI;
const _jwtSecret = process.env.WFAP_JWT_SECRET;

if (!isEnvironment(_env)) {
  throw new Error("NODE_ENV must be either 'development' or 'production'");
}

if (!_discordClientId || !_discordClientSecret || !_discordRedirectUri) {
  throw new Error(
    "WFAP_DISCORD_CLIENT_ID, WFAP_DISCORD_CLIENT_SECRET or WFAP_DISCORD_REDIRECT_URL missing"
  );
}

if (!_jwtSecret) {
  throw new Error("WFAP_JWT_SECRET not provided");
}

const env = _env;
const port = Number(_port) || 4000;
const discordClientId = _discordClientId;
const discordClientSecret = _discordClientSecret;
const discordRedirectUri = _discordRedirectUri;
const jwtSecret = _jwtSecret;

const connParams: ConnectionOptions = {
  type: "sqlite",
  database: env === "production" ? "./db.sqlite" : "./db-dev.sqlite",
  entities: [__dirname + "/entity/*.ts"],
  synchronize: env === "development" ? true : false,
  logging: env === "development" ? true : false,
};

export default {
  env,
  port,
  sqlite: {
    connParams,
  },
  discord: {
    clientId: discordClientId,
    clientSecret: discordClientSecret,
    redirectUri: discordRedirectUri,
  },
  auth: {
    jwtSecret,
  },
};
