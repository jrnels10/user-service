import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AppService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  handleCreateUser(data: AuthCredentialsDto) {
    return this.userRepository.signUp(data);
  }
}
