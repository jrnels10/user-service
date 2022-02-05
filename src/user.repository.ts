import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthCredentialsDto,
  AuthSignInCredentialsDto,
} from './auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { firstName, lastName, email, password } = authCredentialsDto;
    const user = this.create(); //new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.createDate = new Date();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('account already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<User> {
    const { email, password } = authSignInCredentialsDto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      delete user.password;
      delete user.salt;
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
