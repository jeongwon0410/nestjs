import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { BoardStatus, CreateBoardDto } from './dto/boards.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './boards.entity';
@Injectable()
export class BoardsService {
    constructor(
        private boardRepository:BoardRepository
    ){}
   

    async getAllBoard():Promise<Board[]>{
        return await this.boardRepository.find();
    }

    async createBoard(createBoardDto:CreateBoardDto):Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto)
    }


    async getBoardById(id:number):Promise<Board> {
        const found = await this.boardRepository.findOne({
            where:{
                id
            }
        })

        if(!found){
            throw new NotFoundException("can not find")
        }
        return found
    }
    
    async deleteBoardById(id:number):Promise<void>{
        const found =  await this.boardRepository.delete(id)

        if(found.affected === 0){
            throw new NotFoundException('can not find!!')
        }
       
    }

    async updateBoardById(id:number,status:BoardStatus):Promise<Board> {
        const board = await this.getBoardById(id)
        board.status = status;
        await this.boardRepository.save(board)
        return board
    }


}
