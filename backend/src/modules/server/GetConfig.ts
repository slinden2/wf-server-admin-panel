import { Resolver, Query, Ctx, UseMiddleware, Arg } from "type-graphql";
import { promises as fs } from "fs";

import { Server } from "../../entity/Server";
import { ServerUser } from "../../entity/ServerUser";
import { isAuth } from "../../middleware/isAuth";
import { Context } from "../../types/Context";
import config from "../../config";

@Resolver()
export class GetConfigResolver {
  @UseMiddleware(isAuth("USER"))
  @Query(() => String!, { nullable: true })
  async getConfig(
    @Ctx() ctx: Context,
    @Arg("serverId") serverId: string
  ): Promise<string> {
    const userServers = await ServerUser.find({ userId: ctx.session?.id });

    if (
      ctx.session?.role !== "ADMIN" &&
      !userServers.find((usrv) => usrv.serverId === serverId)
    ) {
      throw new Error(
        `You are not authorized to access the config of the server: ${serverId}`
      );
    }

    const server = await Server.findOne({ id: serverId });

    if (!server) {
      throw new Error(`Server not found with id: ${serverId}`);
    }

    const configFile = await fs.readFile(
      config.servers.pidPath + `/${server.name}.cfg`,
      "utf-8"
    );

    return configFile;
  }
}
