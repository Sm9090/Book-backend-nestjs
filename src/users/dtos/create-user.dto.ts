import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'minimum title atleast 2 characters' })
  readonly name: string;
  @IsEmail({} , {message : "Please Enter Valid Email Address"})
  readonly email: string;
  @IsString()
  @MinLength(6 ,{message: "Minimum 6 characters"})
  readonly password: string
  
}
