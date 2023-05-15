import { Board } from "src/boards/boards.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;


    // @OneToMany(type => Board, board=> board.user, {eager:true})
    // boards : Board[]

}