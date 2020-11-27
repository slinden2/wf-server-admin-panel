import axios from "axios";
import config from "../config";

export const sendMessageWebhook = async (id: string, username: string) => {
  await axios.post(config.discord.webhookUri, {
    content: `New user created. Id: ${id}, username: ${username}`,
  });
};
