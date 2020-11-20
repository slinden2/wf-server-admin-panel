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

@ObjectType()
@Entity({ name: "servers" })
export class Server extends BaseEntity {
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
  @Column({ type: "varchar", unique: true, update: false })
  name: string;

  @Field()
  @Column("integer")
  pid: number;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  displayName: string;

  @Field()
  @Column("int")
  playerCount: number;

  @Field()
  @Column("int")
  maxPlayerCount: number;

  @OneToMany(() => ServerUser, (su) => su.server)
  userConnection: ServerUser[];
}
