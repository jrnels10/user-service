import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule {}
