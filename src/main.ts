import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    await app.listen(4000);
  } catch (err) {
    console.log(err); // <-- for example, ECONNREFUSED error
  }
}
bootstrap();
