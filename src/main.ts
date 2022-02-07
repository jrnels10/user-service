import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors({ origin: '*' });
  app.connectMicroservice({
    transport: Transport.TCP,
  });
  await app.startAllMicroservices();
  const port = process.env.PORT || 5001;

  await app.listen(port, () => console.log(`Listening on port ${port}`));
}
bootstrap();
