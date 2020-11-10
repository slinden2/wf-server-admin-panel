import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Server } from "./Server";
import { User } from "./User";

@Entity()
export class ServerUser extends BaseEntity {
  @PrimaryColumn()
  serverId: string;

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
