import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  @IsString()
  email: string;

  // @IsString()
  // userType: UserType;

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
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase and lowercase letter and one number or special character',
  }) // at least one uppercase letter / at least one lowercase letter / at least one number or special character
  password: string;
}
