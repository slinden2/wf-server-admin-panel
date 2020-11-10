import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../../middleware/isAuth";
import { Context } from "../../types/Context";

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth("USER"))
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    const user = await User.findOne({
      where: { id: ctx.session?.id },
    });

    return user;
  }
}
