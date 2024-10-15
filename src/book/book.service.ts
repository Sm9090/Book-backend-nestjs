import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './Schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = limit * (page - 1)
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const books = await this.bookModel.find({...keyword}).limit(limit).skip(skip);
    return books;
  }
  async createBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }
  async findById(id: string): Promise<Book> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const book = await this.bookModel.findById(id);
    console.log(book);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    return book;
  }
  async updateById(id: string, book: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    return updatedBook;
  }
  async deleteById(id: string): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndDelete(id);
    return updatedBook;
  }
}
