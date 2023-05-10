import { Repository } from "typeorm";
import { Board } from "./boards.entity";
import { CustomRepository } from "./typeorm/typeorm.decorator";
import { BoardStatus, CreateBoardDto } from "./dto/boards.dto";


@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(CreateBoardDto:CreateBoardDto):Promise<Board>{
        const {title,description} = CreateBoardDto
        const board = await this.create({
            title,
            description,
            status:BoardStatus.PUBLIC
        })

        await this.save(board)
        return board;
    }

}