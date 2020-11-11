import { Resolver, UseMiddleware, Mutation, Arg } from "type-graphql";

import { Server } from "../../entity/Server";
import { isAuth } from "../../middleware/isAuth";
import { SetDisplayNameInput } from "./setDisplayName/SetDisplayNameInput";

@Resolver()
export class SetDisplayNameResolver {
  @UseMiddleware(isAuth("ADMIN"))
  @Mutation(() => Server!)
  async setDisplayName(
    @Arg("data") data: SetDisplayNameInput
  ): Promise<Server> {
    const server = await Server.findOne({ id: data.serverId });

    if (!server) {
      throw new Error(`No server found with id: ${data.serverId}`);
    }

    server.displayName = data.name;
    const updatedServer = await server.save();

    return updatedServer;
  }
}
