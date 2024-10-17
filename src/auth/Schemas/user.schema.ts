import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../roles.enum.ts/role.enum';
import { Roles } from '../decorators/roles.decorator';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;
  @Prop({ unique: [true, 'email already exists'] })
  email: string;
  @Prop()
  password: string;
  @Prop({ type: String, enum: Role, default: 'user' })
  role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
