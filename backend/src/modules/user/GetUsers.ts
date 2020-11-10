import { Resolver, Query, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class GetUsersResolver {
  @UseMiddleware(isAuth("ADMIN"))
  @Query(() => [User!], { nullable: true })
  async getUsers(): Promise<User[] | undefined> {
    const users = await User.find();
    return users;
  }
}
