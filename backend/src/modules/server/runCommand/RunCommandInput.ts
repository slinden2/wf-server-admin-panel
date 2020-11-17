import { IsUUID } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class RunCommandInput {
  @Field()
  @IsUUID()
  serverId: string;

  @Field()
  type: "START" | "STOP" | "COMMAND";

  @Field({ nullable: true })
  command: string;
}
