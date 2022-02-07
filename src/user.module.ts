import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { UserController } from './user.controller';
import { AppService } from './user.service';
import { typeOrmConfig } from './config/typeorm.config';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserRepository]),
    ClientsModule.register([
      {
        name: 'COMMUNICATION',
        transport: Transport.TCP,
        options: { port: 3000 },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [AppService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
