import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../auth/Schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
//   controllers: [AuthController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
