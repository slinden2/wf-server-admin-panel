import { Resolver, UseMiddleware, Mutation, Arg } from "type-graphql";

import { ServerUser } from "../../entity/ServerUser";
import { User } from "../../entity/User";
import { isAuth } from "../../middleware/isAuth";
import { SetUserServersInput } from "./setUserServers/SetUserServersInput";

@Resolver()
export class SetUserServersResolver {
  @UseMiddleware(isAuth("ADMIN"))
  @Mutation(() => User!, { nullable: true })
  async setUserServers(
    @Arg("data") data: SetUserServersInput
  ): Promise<User | null> {
    const user = await User.findOne({ id: data.userId });

    if (!user) {
      return null;
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

    await Promise.all(newServerUsers);

    return user;
  }
}
