import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.connectMicroservice({
    transport: Transport.TCP,
  });
  await app.startAllMicroservices();
  await app.listen(3001, () => console.log(`Listening on port ${3001}`));
}
bootstrap();
