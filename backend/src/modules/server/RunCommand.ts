import { Resolver, UseMiddleware, Mutation, Arg } from "type-graphql";
import Shell from "node-powershell";

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

    const ps = new Shell({ executionPolicy: "Bypass", noProfile: true });

    switch (data.type) {
      case Command.START:
        ps.addCommand(
          `C:\\Windows\\System32\\schtasks.exe /run /tn "${server?.name} Start"`
        );
        break;
      case Command.STOP:
        ps.addCommand(
          `C:\\Windows\\System32\\schtasks.exe /run /tn "${server?.name} Stop"`
        );
        break;
      case Command.COMMAND:
        ps.addCommand(
          `autohotkeyu64 D:\\OneDrive\\WFShare\\ahk\\wfap_send_command.ahk "${data.command}" ${server?.pid}`
        );
        break;
      case Command.REBOOT:
        ps.addCommand('C:\\Windows\\System32\\schtasks.exe /run /tn "Reboot"');
        break;
      case Command.UPDATE_MODS:
        ps.addCommand(
          'C:\\Windows\\System32\\schtasks.exe /run /tn "Mod Update"'
        );
        break;
      case Command.UPDATE_WF_SERVER:
        ps.addCommand(
          'C:\\Windows\\System32\\schtasks.exe /run /tn "Update WF Server"'
        );
        break;
      default:
        return false;
    }

    try {
      await ps.invoke();
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  }
}
