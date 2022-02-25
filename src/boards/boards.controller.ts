import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // getAllBoards(): Board[] {
  //   // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다.
  //   return this.boardsService.getAllBoards();
  // }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() creatBoardDto: CreateBoardDto): Promise<Board> {
    // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다. Result<T> ? 영한님 강의에서 처럼....
    return this.boardsService.createBoard(creatBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다. Result<T> ? 영한님 강의에서 처럼....
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다. Result<T> ? 영한님 강의에서 처럼....
    return this.boardsService.updateBoardStatus(id, status);
  }
}
