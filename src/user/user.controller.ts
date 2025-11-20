import { Controller, Get, Param } from '@nestjs/common';
import { CustomParseIntPipe } from 'src/common/pipes/custom-int-pipe.pipe';

@Controller('user')
export class UserController {
  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    return `hello from user ${id}`;
  }
}
