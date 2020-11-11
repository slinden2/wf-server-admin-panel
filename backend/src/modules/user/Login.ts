import { Resolver, Mutation, Arg, Query } from "type-graphql";

import { getDiscordUser } from "./login/getDiscordUser";
import { User } from "../../entity/User";
import config from "../../config";
import { encodeSession } from "../../utils/encodeSession";
import { PartialSession } from "../../types/PartialSession";
import { EncodeResult } from "../../types/EncodeResult";

@Resolver()
export class LoginResolver {
  @Query(() => String!) // Query needed for schema creation
  hello(): string {
    return "Hello World!";
  }

  @Mutation(() => User!, { nullable: true })
  async login(@Arg("code") code: string): Promise<EncodeResult> {
    const discordUser = await getDiscordUser(code);

    let user = await User.findOne({ where: { discordId: discordUser.id } });
    if (user) {
      console.log("User found:");
    }

    if (!user) {
      user = await User.create({
        discordId: discordUser.id,
        username: discordUser.username,
        role: config.discord.adminId === discordUser.id ? "ADMIN" : "USER",
      }).save();
      console.log("New user created:");
    }

    console.log(JSON.stringify(user, undefined, 2));

    const partialSession: PartialSession = {
      dateCreated: Date.now(),
      id: user.id,
      role: user.role,
      username: user.username,
    };

    const encodeResult = encodeSession(config.auth.jwtSecret, partialSession);
    console.log(encodeResult);

    return encodeResult;
  }
}
