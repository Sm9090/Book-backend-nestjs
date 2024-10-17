import { Type } from 'class-transformer';
import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { User } from 'src/auth/Schemas/user.schema';
import { Category } from '../Schemas/book.schema';

export class CreateBookDto {
  @IsString()
  @MinLength(2, { message: 'minimum title atleast 2 characters' })
  readonly title: string;
  @IsString()
  @IsOptional()
  readonly description: string;
  @IsString()
  readonly author: string;
  @Type(() => Number)
  @IsNumber()
  readonly price: number;
  @IsEnum(Category, { message: 'Category must be one of: Adventure, Classics, Crime, Fantasy' })
  readonly category: Category;
  @IsEmpty({message: "you cannot pass user id"})
  readonly user: User;
}
