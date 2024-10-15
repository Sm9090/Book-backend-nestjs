import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Schemas/book.schema';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }
  @Post()
  async create(@Body() body: CreateBookDto): Promise<Book> {
    console.log(body);
    return this.bookService.createBook(body);
  }
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }
  @Put(':id')
  async updateBookById(
    @Param('id') id: string,
    @Body() body: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, body);
  }
  @Delete(':id')
  async deleteBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
