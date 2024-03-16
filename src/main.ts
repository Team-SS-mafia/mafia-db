import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // 허용할 출처
    methods: 'POST', // 허용할 HTTP 메서드
    allowedHeaders: 'Content-Type, Accept, Authorization', // 허용할 헤더
  });
  await app.listen(3002);
}
bootstrap();
