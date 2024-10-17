import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from 'src/auth/Schemas/user.schema';
import { LoginInDto } from 'src/auth/dtos/LogIn.dto';
import { SignUpDto } from 'src/auth/dtos/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}
  async register(CreateUserDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = CreateUserDto;

    const existedUser = await this.UserModel.findOne({ email });
    if (existedUser) {
      throw new ConflictException('Email Already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
  async login(LoginDto: LoginInDto): Promise<{ token: string }> {
    const { email, password } = LoginDto;
    if (email === '' || password === '') {
      throw new BadRequestException('Email or Password is required');
    }
    const existedUser = await this.UserModel.findOne({ email });

    if(!existedUser){
      throw new UnauthorizedException('Invalid credentials');
    }

    const isCorrectPassword = await bcrypt.compare(password , existedUser.password)
    
    if(!isCorrectPassword){
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: existedUser._id });

    return { token };
  }
}
