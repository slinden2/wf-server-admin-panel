import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Server } from "./Server";
import { User } from "./User";

@ObjectType()
@Entity()
export class ServerUser extends BaseEntity {
  @Field()
  @PrimaryColumn()
  serverId: string;

  @Field()
  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => Server, (server) => server.userConnection, { primary: true })
  @JoinColumn({ name: "serverId" })
  server: Server;

  @ManyToOne(() => User, (user) => user.serverConnection, {
    primary: true,
  })
  @JoinColumn({ name: "userId" })
  user: User;
}
