import { Resolver, UseMiddleware, Mutation, Arg } from "type-graphql";

import { Server } from "../../entity/Server";
import { isAuth } from "../../middleware/isAuth";
import { Command, RunCommandInput } from "./runCommand/RunCommandInput";

@Resolver()
export class RunCommandResolver {
  @UseMiddleware(isAuth("USER"))
  @Mutation(() => Boolean!)
  async runCommand(@Arg("data") data: RunCommandInput): Promise<boolean> {
    if (
      (data.command === Command.START,
      data.command === Command.STOP,
      data.command === Command.COMMAND)
    ) {
      throw new Error(
        `To run the command '${data.command}' also a serverId must be provided`
      );
    }

    let server: Server | undefined;
    if (data.serverId) {
      server = await Server.findOne({ id: data.serverId });
      if (!server) {
        throw new Error(
          `Unable to run ${data.type}. No server found. Provided serverId: ${data.serverId}`
        );
      }
    }

    switch (data.type) {
      case Command.START:
        console.log(
          `C:\\Windows\\System32\\schtasks.exe /run /tn "${server?.name} Start"`
        );
        break;
      case Command.STOP:
        console.log(
          `C:\\Windows\\System32\\schtasks.exe /run /tn "${server?.name} Stop"`
        );
        break;
      case Command.COMMAND:
        console.log(`autohotkeyu64 test.ahk ${data.command} ${server?.pid}`);
        break;
      case Command.REBOOT:
        console.log('C:\\Windows\\System32\\schtasks.exe /run /tn "Reboot"');
        break;
      case Command.UPDATE_MODS:
        console.log(
          'C:\\Windows\\System32\\schtasks.exe /run /tn "Mod Update"'
        );
        break;
      case Command.UPDATE_WF_SERVER:
        console.log(
          'C:\\Windows\\System32\\schtasks.exe /run /tn "Update WF Server"'
        );
        break;
      default:
        return false;
    }

    return true;
  }
}
