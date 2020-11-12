import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class EncodeResult {
  @Field()
  token: string;

  @Field()
  expires: number;

  @Field()
  issued: number;
}
