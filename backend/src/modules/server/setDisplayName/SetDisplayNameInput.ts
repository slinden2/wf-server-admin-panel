import { IsUUID } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class SetDisplayNameInput {
  @Field()
  @IsUUID()
  serverId: string;

  @Field()
  name: string;
}
