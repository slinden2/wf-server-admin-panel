import config from "../../config";

export interface AuthData {
  client_id: string;
  client_secret: string;
  grant_type: string;
  redirect_uri: string;
  scope: string;
  code?: string;
}

export const authData: AuthData = {
  client_id: config.discord.clientId,
  client_secret: config.discord.clientSecret,
  grant_type: "authorization_code",
  redirect_uri: config.discord.redirectUri,
  scope: "identity",
};

export const authUrl = "https://discordapp.com/api/oauth2/token";

export const userDataUrl = "https://discordapp.com/api/users/@me";
