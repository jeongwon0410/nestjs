import { Repository } from "typeorm";
import { Board } from "./boards.entity";
import { CustomRepository } from "../typeorm/typeorm.decorator";
import { BoardStatus, CreateBoardDto } from "./dto/boards.dto";
import { User } from "src/auth/auth.entity";


@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

    // async createBoard(CreateBoardDto:CreateBoardDto,user:User):Promise<Board>{
    //     const {title,description} = CreateBoardDto
    //     const board = await this.create({
    //         title,
    //         description,
    //         status:BoardStatus.PUBLIC,
    //         user
    //     })

    //     await this.save(board)
    //     return board;
    // }

}