import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase and lowercase letter and one number or special character',
  }) // at least one uppercase letter / at least one lowercase letter / at least one number or special character
  password: string;
}

export class AuthSignInCredentialsDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase and lowercase letter and one number or special character',
  }) // at least one uppercase letter / at least one lowercase letter / at least one number or special character
  password: string;
}
