import { IsUUID } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class SetUserServersInput {
  @Field()
  @IsUUID()
  userId: string;

  @Field(() => [String])
  serverIds: string[];
}
