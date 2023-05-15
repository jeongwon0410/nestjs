import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { TypeOrmCustomModule } from '../typeorm/typeorm.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports:[
    TypeOrmCustomModule.forCustomRepository([BoardRepository]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
