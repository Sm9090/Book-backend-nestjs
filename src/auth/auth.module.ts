import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/Schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory:(config: ConfigService) =>{
        return{
          secret: config.get<string>('JWT_SCERET'),
          signOptions: {
            expiresIn: config.get<string | number>('TOKEN_EXPIRY')
          }
        }
      }
    }),
  ],
  controllers: [AuthController ],
  providers: [AuthService ,JwtStrategy],
  exports: [JwtStrategy , PassportModule]
})
export class AuthModule {}
