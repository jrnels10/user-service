import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthCredentialsDto,
  AuthSignInCredentialsDto,
} from './auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AppService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  handleCreateUser(data: AuthCredentialsDto) {
    return this.userRepository.signUp(data);
  }

  async signin(
    authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.userRepository.validateUserPassword(
      authSignInCredentialsDto,
    );
    if (!user.email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Genereate JWT Token with payload ${JSON.stringify(payload)}`,
    );
    return { accessToken, user };
  }

  async findByPayLoad(payload: any) {
    const { userId } = payload;
    return await this.userRepository.findOne({ id: userId });
  }
}
