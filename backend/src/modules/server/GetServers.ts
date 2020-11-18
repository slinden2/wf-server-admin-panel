import { Resolver, Query, UseMiddleware } from "type-graphql";
import { Server } from "../../entity/Server";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class GetServersResolver {
  @UseMiddleware(isAuth("ADMIN"))
  @Query(() => [Server!], { nullable: true })
  async getServers(): Promise<Server[] | undefined> {
    const servers = await Server.find();
    return servers;
  }
}
