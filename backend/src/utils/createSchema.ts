import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { GetUsersResolver } from "../modules/user/GetUsers";
import { LoginResolver } from "../modules/user/Login";
import { MeResolver } from "../modules/user/Me";
import { SetUserServersResolver } from "../modules/server/SetUserServers";
import { SetDisplayNameResolver } from "../modules/server/SetDisplayName";
import { RunCommandResolver } from "../modules/server/RunCommand";
import { GetLogResolver } from "../modules/server/GetLog";
import { GetConfigResolver } from "../modules/server/GetConfig";
import { SaveConfigResolver } from "../modules/server/SaveConfig";
import { GetServersResolver } from "../modules/server/GetServers";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [
      LoginResolver,
      MeResolver,
      GetUsersResolver,
      SetUserServersResolver,
      SetDisplayNameResolver,
      RunCommandResolver,
      GetLogResolver,
      GetConfigResolver,
      SaveConfigResolver,
      GetServersResolver,
    ],
  });
