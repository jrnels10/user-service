import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(UserModule);
  app.enableCors({ origin: '*' });
  app.connectMicroservice({
    transport: Transport.TCP,
  });
  await app.startAllMicroservices();
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port, () => console.log(`Listening on port ${port}`));
}
bootstrap();
