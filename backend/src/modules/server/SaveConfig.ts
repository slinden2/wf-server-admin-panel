import { Resolver, Ctx, UseMiddleware, Arg, Mutation } from "type-graphql";
import { promises as fs } from "fs";

import { Server } from "../../entity/Server";
import { ServerUser } from "../../entity/ServerUser";
import { isAuth } from "../../middleware/isAuth";
import { Context } from "../../types/Context";
import config from "../../config";

@Resolver()
export class SaveConfigResolver {
  @UseMiddleware(isAuth("USER"))
  @Mutation(() => Boolean!)
  async saveConfig(
    @Ctx() ctx: Context,
    @Arg("serverId") serverId: string,
    @Arg("newConfig") newConfig: string
  ): Promise<boolean> {
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

    await fs.writeFile(
      `${config.servers.pidPath}/${server.name}.cfg`,
      newConfig
    );

    return true;
  }
}
