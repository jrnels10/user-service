import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const config = new DocumentBuilder()
    .setTitle('User-Service')
    .setDescription('Creates user accounts and authenticates')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors({ origin: '*' });
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      url: 'http://localhost:3000',
    },
  });
  await app.startAllMicroservices();
  const port = process.env.PORT || 5001;

  await app.listen(port, () => console.log(`Listening on port ${port}`));
}
bootstrap();
