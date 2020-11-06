import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { MeResolver } from "../modules/user/Me";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [MeResolver],
  });
