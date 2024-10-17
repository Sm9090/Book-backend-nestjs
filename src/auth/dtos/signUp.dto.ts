import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(2, { message: 'minimum  name atleast 2 characters' })
  readonly name: string;
  @IsEmail({} , {message : "Please Enter Valid Email Address"})
  readonly email: string;
  @IsString()
  @MinLength(6 ,{message: "Minimum 6 characters"})
  readonly password: string
  // @IsOptional()
  // readonly role: string
  
}
