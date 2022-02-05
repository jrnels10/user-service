import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import {
  AuthCredentialsDto,
  AuthSignInCredentialsDto,
} from './auth-credentials.dto';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create_user')
  createUser(@Body(ValidationPipe) data: AuthCredentialsDto) {
    this.appService.handleCreateUser(data);
  }

  @EventPattern('create_user')
  handleUserCreated(data: AuthCredentialsDto) {
    console.log('controller', data);
    this.appService.handleCreateUser(data);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.appService.signin(authSignInCredentialsDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User) {
    return user;
  }

  @Get('/signInToken')
  @UseGuards(AuthGuard('jwt'))
  signInToken(@Req() req): { user: User } {
    const { user } = req;
    delete user.password;
    delete user.salt;
    return user;
  }
}
