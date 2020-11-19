import { IsUUID } from "class-validator";
import { InputType, Field, registerEnumType } from "type-graphql";

export enum Command {
  START = "START",
  STOP = "STOP",
  COMMAND = "COMMAND",
  REBOOT = "REBOOT",
  UPDATE_MODS = "UPDATE_MODS",
  UPDATE_WF_SERVER = "UPDATE_WF_SERVER",
}

registerEnumType(Command, {
  name: "Command",
});

@InputType()
export class RunCommandInput {
  @Field(() => Command)
  type: Command;

  @Field({ nullable: true })
  @IsUUID()
  serverId: string;

  @Field({ nullable: true })
  command: string;
}
