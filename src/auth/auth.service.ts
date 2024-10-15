import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}
  async register(CreateUserDto: CreateUserDto): Promise<{ token: string }> {
    const { name, email, password } = CreateUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
  //   async signIn(email: string, pass: string): Promise<any> {
  //     const user = await this.UserModel.findOne(email);
  //     if (user?.password !== pass) {
  //       throw new UnauthorizedException('Invalid Crendtial');
  //     }
  //     const { password, ...result } = user;
  //     // TODO: Generate a JWT and return it here
  //     // instead of the user object
  //     return result;
  //   }
}
