import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Board[] {
    // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다.
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다.
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다.
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }
}
