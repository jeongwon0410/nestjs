import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus, CreateBoardDto } from './dto/boards.dto';
import { Board } from './boards.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/auth.entity';

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
    constructor(private boardsService:BoardsService){}
    private logger = new Logger('BoardsController')
    @Get("/all")
    getAllBoards(@Req() req):Promise<Board[]>{
        this.logger.verbose(req.headers)
        return this.boardsService.getAllBoard();
    }

    // @Post("/create")
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() CreateBoardDto:CreateBoardDto,
    // @GetUser() user:User):Promise<Board>{
    //     return this.boardsService.createBoard(CreateBoardDto,user);
    // }

    @Get("/:id")
    getBoardById(@Param("id",ParseIntPipe) id:number):Promise<Board>{
        return this.boardsService.getBoardById(id)
    }


    @Get("/:id")
    getBoard(@Param("id",ParseIntPipe) id:number,@GetUser() user:User):Promise<Board>{
        console.log(user)
        return this.boardsService.getBoard(id,user)
    }


    @Delete("/:id")
    deleteBoardById(@Param("id",ParseIntPipe) id:number,@GetUser() user:User):Promise<void>{
        return this.boardsService.deleteBoardById(id,user)
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param("id",ParseIntPipe) id:number, @Body('status') status:BoardStatus):Promise<Board>{
        return this.boardsService.updateBoardById(id,status)
    }
}
