import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
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
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다.
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다.
    const found = this.boardsService.getBoardById(id);

    if (!found) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    return found;
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ): Board {
    // 엔티티 그대로 리턴하면 안 좋다. 리턴 타입을 새로 만드는 게 좋다.
    return this.boardsService.updateBoardStatus(id, status);
  }
}
