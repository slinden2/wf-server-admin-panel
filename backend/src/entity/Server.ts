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
  @Column({ unique: true, update: false })
  name: string;

  @Field()
  @Column()
  pid: number;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  displayName: string;

  @Field()
  @Column()
  playerCount: number;

  @Field()
  @Column()
  maxPlayerCount: number;

  @Field()
  @Column()
  startedDate: Date;

  @OneToMany(() => ServerUser, (su) => su.server)
  userConnection: ServerUser[];
}
