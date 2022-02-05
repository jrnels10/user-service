import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthCredentialsDto } from './auth-credentials.dto';

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
}
