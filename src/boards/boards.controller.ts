import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus, CreateBoardDto } from './dto/boards.dto';
import { Board } from './boards.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService:BoardsService){}

    @Get("/")
    getAllBoards():Promise<Board[]>{
        return this.boardsService.getAllBoard();
    }

    @Post("/create")
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto:CreateBoardDto):Promise<Board>{
        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Get("/:id")
    getBoardById(@Param("id",ParseIntPipe) id:number):Promise<Board>{
        return this.boardsService.getBoardById(id)
    }


    @Delete("/:id")
    deleteBoardById(@Param("id",ParseIntPipe) id:number):Promise<void>{
        return this.boardsService.deleteBoardById(id)
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param("id",ParseIntPipe) id:number, @Body('status') status:BoardStatus):Promise<Board>{
        return this.boardsService.updateBoardById(id,status)
    }
}
