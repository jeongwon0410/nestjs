import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./dto/boards.dto";
import { User } from "src/auth/auth.entity";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    // @ManyToOne(type=>User, user=>user.boards,{eager:false})
    // user: User
}