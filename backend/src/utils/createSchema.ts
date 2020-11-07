import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { LoginResolver } from "../modules/user/Login";
import { MeResolver } from "../modules/user/Me";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [LoginResolver, MeResolver],
  });
