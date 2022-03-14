import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    // entity 타입을 포함하여 리턴하는 것 보다는, DTO 등 별도의 타입을 포함하는 Result<T> 와 같은 타입으로 리턴 해 주는 것이 좋다.
    return this.boardsService.getAllBoards(user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} creating a new board.
      Payload: ${JSON.stringify(createBoardDto)}`,
    );
    // entity 타입을 포함하여 리턴하는 것 보다는, DTO 등 별도의 타입을 포함하는 Result<T> 와 같은 타입으로 리턴 해 주는 것이 좋다.
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    // entity 타입을 포함하여 리턴하는 것 보다는, DTO 등 별도의 타입을 포함하는 Result<T> 와 같은 타입으로 리턴 해 주는 것이 좋다.
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
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
