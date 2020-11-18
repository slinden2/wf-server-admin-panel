import { Resolver, UseMiddleware, Mutation, Arg } from "type-graphql";

import { ServerUser } from "../../entity/ServerUser";
import { User } from "../../entity/User";
import { isAuth } from "../../middleware/isAuth";
import { SetUserServersInput } from "./setUserServers/SetUserServersInput";

@Resolver()
export class SetUserServersResolver {
  @UseMiddleware(isAuth("ADMIN"))
  @Mutation(() => [ServerUser!]!)
  async setUserServers(
    @Arg("data") data: SetUserServersInput
  ): Promise<ServerUser[]> {
    const user = await User.findOne({ id: data.userId });

    if (!user) {
      throw new Error(`No user found with id: ${data.userId}`);
    }

    // Remove users previous servers
    await ServerUser.delete({ userId: data.userId });

    // Add new server to user
    const newServerUsers: Promise<ServerUser>[] = data.serverIds.map(
      (serverId) => {
        const newServerUser = new ServerUser();
        newServerUser.userId = data.userId;
        newServerUser.serverId = serverId;
        return newServerUser.save();
      }
    );

    const serverUser = await Promise.all(newServerUsers);

    return serverUser;
  }
}
