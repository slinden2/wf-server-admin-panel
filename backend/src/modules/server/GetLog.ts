import { Resolver, Query, Ctx, UseMiddleware, Arg } from "type-graphql";
import { promises as fs } from "fs";

import { Server } from "../../entity/Server";
import { ServerUser } from "../../entity/ServerUser";
import { isAuth } from "../../middleware/isAuth";
import { Context } from "../../types/Context";
import config from "../../config";
import { parseLog } from "./getLog/parseLog";

@Resolver()
export class GetLogResolver {
  @UseMiddleware(isAuth("USER"))
  @Query(() => String!, { nullable: true })
  async getLog(
    @Ctx() ctx: Context,
    @Arg("serverId") serverId: string,
    @Arg("numOfRows", { nullable: true }) numOfRows: number
  ): Promise<string> {
    const userServers = await ServerUser.find({ userId: ctx.session?.id });

    if (
      ctx.session?.role !== "ADMIN" &&
      !userServers.find((usrv) => usrv.serverId === serverId)
    ) {
      throw new Error(
        `You are not authorized to access the logs of the server: ${serverId}`
      );
    }

    const server = await Server.findOne({ id: serverId });

    if (!server) {
      throw new Error(`Server not found with id: ${serverId}`);
    }

    const logFile = await fs.readFile(
      config.servers.pidPath + `/${server.name}.log`,
      "utf-8"
    );

    const parsedLog = parseLog(logFile, numOfRows || 25);

    return parsedLog;
  }
}
