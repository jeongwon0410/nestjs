import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { BoardStatus, CreateBoardDto } from './dto/boards.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './boards.entity';
import { User } from 'src/auth/auth.entity';
@Injectable()
export class BoardsService {
    constructor(
        private boardRepository:BoardRepository
    ){}
   

    async getAllBoard():Promise<Board[]>{
        return await this.boardRepository.find();
    }

    // async createBoard(createBoardDto:CreateBoardDto,user:User):Promise<Board>{
    //     return this.boardRepository.createBoard(createBoardDto,user)
    
    // }


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


    async getBoard(id:number,user:User):Promise<Board> {

        const found = await this.boardRepository.createQueryBuilder('board')
        .where('board.userId = :userId', {userId:user.id})
        .andWhere('board.id = :id',{id:id})
        .getOne()

        if(!found){
            throw new NotFoundException("can not find")
        }
        return found
    }
    
    async deleteBoardById(id:number,user:User):Promise<void>{
        // const found =  await this.boardRepository.delete(id)

        const found = await this.boardRepository.createQueryBuilder('board')
        .delete()
        .where('board.userId = :userId', {userId:user.id})
        .andWhere('board.id = :id',{id:id})
        .execute()

    
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
