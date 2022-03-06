import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    // entity 타입을 포함하여 리턴하는 것 보다는, DTO 등 별도의 타입을 포함하는 Result<T> 와 같은 타입으로 리턴 해 주는 것이 좋다.
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() creatBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    // entity 타입을 포함하여 리턴하는 것 보다는, DTO 등 별도의 타입을 포함하는 Result<T> 와 같은 타입으로 리턴 해 주는 것이 좋다.
    return this.boardsService.createBoard(creatBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    // entity 타입을 포함하여 리턴하는 것 보다는, DTO 등 별도의 타입을 포함하는 Result<T> 와 같은 타입으로 리턴 해 주는 것이 좋다.
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus, // 별도의 DTO를 이용하는 방법이 더 낫다.
  ): Promise<Board> {
    // entity 타입을 포함하여 리턴하는 것 보다는, DTO 등 별도의 타입을 포함하는 Result<T> 와 같은 타입으로 리턴 해 주는 것이 좋다.
    return this.boardsService.updateBoardStatus(id, status);
  }
}
