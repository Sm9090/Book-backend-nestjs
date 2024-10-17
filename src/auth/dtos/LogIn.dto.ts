import { IsEmail, IsString } from 'class-validator';

export class LoginInDto  {
  @IsEmail({}, { message: 'Please Enter Valid Email Address' })
  readonly email: string;
  @IsString()
  readonly password: string;
}
