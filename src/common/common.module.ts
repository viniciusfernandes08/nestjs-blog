import { Module } from '@nestjs/common';
import { BcryptHashService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptHashService,
    },
  ],
  exports: [HashingService],
})
export class CommonModule {}
