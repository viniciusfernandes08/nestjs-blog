import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { parseCorsWhiteList } from './common/utils/parse-cors-whitelist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  const corsWhiteList = parseCorsWhiteList(process.env.CORS_WHITELIST ?? '');

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (...args: any[]) => void,
    ) => {
      if (!origin || corsWhiteList.includes(origin)) {
        return callback(null, true);
      }

      return callback(new ForbiddenException('Forbidden'), false);
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.APP_PORT ?? 3000);
}
void bootstrap();
