import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomParseIntPipe } from 'src/common/pipes/custom-int-pipe.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly configService: ConfigService) {}
  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    return `hello from user ${id}`;
  }
}
