import { Resolver, UseMiddleware, Mutation, Arg } from "type-graphql";

import { Server } from "../../entity/Server";
import { isAuth } from "../../middleware/isAuth";
import { RunCommandInput } from "./runCommand/RunCommandInput";

@Resolver()
export class RunCommandResolver {
  @UseMiddleware(isAuth("USER"))
  @Mutation(() => Boolean!)
  async runCommand(@Arg("data") data: RunCommandInput): Promise<boolean> {
    const server = await Server.findOne({ id: data.serverId });

    if (!server) {
      throw new Error(
        `Unable to run ${data.type}. No server found. Provided serverId: ${data.serverId}`
      );
    }

    switch (data.type) {
      case "START":
        console.log(
          `C:\\Windows\\System32\\schtasks.exe /run /tn "${server.name} Start"`
        );
        break;
      case "STOP":
        console.log(
          `C:\\Windows\\System32\\schtasks.exe /run /tn "${server.name} Stop"`
        );
        break;
      case "COMMAND":
        console.log(`autohotkeyu64 test.ahk ${data.command} ${server.pid}`);
        break;
      default:
        return false;
    }

    return true;
  }
}
