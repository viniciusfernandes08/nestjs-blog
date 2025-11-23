import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomParseIntPipe } from 'src/common/pipes/custom-int-pipe.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    return `hello from user ${id}`;
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
