import { memoryStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

// memory storage fica na memória do servidor
export const storage = memoryStorage();

export const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(
      new BadRequestException('Somente imagens são permitidas!'),
      false,
    );
  }
  cb(null, true);
};
