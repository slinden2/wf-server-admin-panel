import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { ServerUser } from "./ServerUser";
import { Server } from "./Server";

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;

  @Field()
  @Column("text", { unique: true })
  discordId: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ default: "USER" })
  role: "ADMIN" | "USER";

  @OneToMany(() => ServerUser, (su) => su.user)
  serverConnection: ServerUser[];

  @Field(() => [Server])
  async servers(): Promise<Server[]> {
    // Admin gets to see all servers
    if (this.role === "ADMIN") {
      return await Server.find();
    }

    // USER gets to see only appointed servers
    const serverUsers = await ServerUser.find({
      join: {
        alias: "serverUsers",
        innerJoinAndSelect: {
          server: "serverUsers.server",
        },
      },
      where: {
        userId: this.id,
      },
    });

    const servers: Server[] = serverUsers
      .map((su) => {
        const newServer = new Server();
        newServer.id = su.server.id;
        newServer.createdDate = su.server.createdDate;
        newServer.updatedDate = su.server.updatedDate;
        newServer.displayName = su.server.displayName;
        newServer.name = su.server.name;
        newServer.pid = su.server.pid;
        newServer.playerCount = su.server.playerCount;
        newServer.maxPlayerCount = su.server.maxPlayerCount;
        newServer.startedDate = su.server.startedDate;
        return newServer;
      })
      .sort((a, b) => (b.name < a.name ? 1 : -1));

    return servers;
  }
}
