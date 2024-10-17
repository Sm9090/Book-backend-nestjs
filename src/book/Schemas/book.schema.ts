import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/Schemas/user.schema';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}
@Schema({
  timestamps: true,
})
export class Book {
  @Prop({ required: true, type: String })
  title: string;
  @Prop({ type: String })
  description: string;
  @Prop({ required: true, type: String })
  author: string;
  @Prop({ required: true, type: Number })
  price: number;
  @Prop({ required: true, type: String , enum: Category })
  category: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId , ref:'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
