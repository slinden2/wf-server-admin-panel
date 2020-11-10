import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID, Ctx } from "type-graphql";
import { ServerUser } from "./ServerUser";
import { Server } from "./Server";
import { Context } from "../types/Context";

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
}
