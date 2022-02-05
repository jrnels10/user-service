import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
  });
  await app.startAllMicroservices();
  await app.listen(3001, () => console.log(`Listening on port ${3001}`));
}
bootstrap();
