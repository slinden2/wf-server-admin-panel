import { Resolver, Mutation, Arg } from "type-graphql";

import { getDiscordUser } from "./login/getDiscordUser";
import { User } from "../../entity/User";
import config from "../../config";
import { encodeSession } from "../../utils/encodeSession";
import { PartialSession } from "../../types/PartialSession";
import { EncodeResult } from "../../types/EncodeResult";
import { sendMessageWebhook } from "../../webhook/sendMessageWebhook";

@Resolver()
export class LoginResolver {
  @Mutation(() => EncodeResult!, { nullable: true })
  async login(@Arg("code") code: string): Promise<EncodeResult> {
    const discordUser = await getDiscordUser(code);

    let user = await User.findOne({ where: { discordId: discordUser.id } });

    if (!user) {
      user = await User.create({
        discordId: discordUser.id,
        username: discordUser.username,
        role: config.discord.adminId === discordUser.id ? "ADMIN" : "USER",
      }).save();
      await sendMessageWebhook(user.id, user.username);
    }

    const partialSession: PartialSession = {
      dateCreated: Date.now(),
      id: user.id,
      role: user.role,
      username: user.username,
    };

    const encodeResult = encodeSession(config.auth.jwtSecret, partialSession);

    return encodeResult;
  }
}
