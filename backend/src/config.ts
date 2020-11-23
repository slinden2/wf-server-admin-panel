import { ConnectionOptions } from "typeorm";
import { isEnvironment } from "./utils/typeGuards";
import fs from "fs";

const _env = process.env.NODE_ENV;
const _httpPort = process.env.WFAP_HTTP_PORT;
const _httpsPort = process.env.WFAP_HTTPS_PORT;
const _discordClientId = process.env.WFAP_DISCORD_CLIENT_ID;
const _discordClientSecret = process.env.WFAP_DISCORD_CLIENT_SECRET;
const _discordRedirectUri = process.env.WFAP_DISCORD_REDIRECT_URI;
const _adminDiscordId = process.env.WFAP_ADMIN_DISCORD_ID;
const _jwtSecret = process.env.WFAP_JWT_SECRET;
const _pidPath = process.env.WFAP_PID_PATH;

if (!isEnvironment(_env)) {
  throw new Error("NODE_ENV must be either 'development' or 'production'");
}

if (!_httpPort || !_httpsPort) {
  throw new Error("WFAP_HTTP_PORT or WFAP_HTTPS_PORT is missing");
}

if (
  !_discordClientId ||
  !_discordClientSecret ||
  !_discordRedirectUri ||
  !_adminDiscordId
) {
  throw new Error(
    "WFAP_DISCORD_CLIENT_ID, WFAP_DISCORD_CLIENT_SECRET, WFAP_DISCORD_REDIRECT_URI or WFAP_ADMIN_DISCORD_ID missing"
  );
}

if (!_jwtSecret) {
  throw new Error("WFAP_JWT_SECRET not provided");
}

if (!_pidPath) {
  throw new Error("WFAP_PID_PATH not provided");
}

const env = _env;
const discordClientId = _discordClientId;
const discordClientSecret = _discordClientSecret;
const discordRedirectUri = _discordRedirectUri;
const adminDiscordId = _adminDiscordId;
const jwtSecret = _jwtSecret;
const pidPath = _pidPath;
const tokenExpirationTime = 15 * 60 * 1000; // fifteen minutes
const tokenGracePeriod = 3 * 60 * 60 * 1000; // three hours

const connParams: ConnectionOptions = {
  type: "sqlite",
  database: env === "production" ? "./db.sqlite" : "./db-dev.sqlite",
  entities: [__dirname + "/entity/*.{ts,js}"],
  synchronize: true,
  logging: env === "development" ? true : false,
};

const certOptions =
  env === "production"
    ? {
        key: fs.readFileSync("c:\\certs\\private.key"),
        cert: fs.readFileSync("c:\\certs\\certificate.crt"),
      }
    : {};

export default {
  env,
  sqlite: {
    connParams,
  },
  discord: {
    clientId: discordClientId,
    clientSecret: discordClientSecret,
    redirectUri: discordRedirectUri,
    adminId: adminDiscordId,
  },
  auth: {
    jwtSecret,
  },
  servers: {
    httpPort: _httpPort,
    httpsPort: _httpsPort,
    certOptions,
    pidPath,
  },
  token: {
    expirationTime: tokenExpirationTime,
    gracePeriod: tokenGracePeriod,
  },
};
