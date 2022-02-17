import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './user.service';
import {
  AuthCredentialsDto,
  AuthSignInCredentialsDto,
} from './auth-credentials.dto';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller()
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('api')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  redirect() {}

  @Post('create_user')
  @MessagePattern({ cmd: 'create_user' })
  handleUserCreated(
    @Body(ValidationPipe) data: AuthCredentialsDto,
  ): Promise<string> {
    return this.appService.handleCreateUser(data);
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log(data);
    return (data || []).reduce((a, b) => a + b);
  }

  @Post('/signin')
  @MessagePattern({ cmd: 'sign_user' })
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
