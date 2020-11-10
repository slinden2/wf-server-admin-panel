import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { GetUsersResolver } from "../modules/user/GetUsers";
import { LoginResolver } from "../modules/user/Login";
import { MeResolver } from "../modules/user/Me";
import { SetUserServersResolver } from "../modules/server/SetUserServers";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [
      LoginResolver,
      MeResolver,
      GetUsersResolver,
      SetUserServersResolver,
    ],
  });
