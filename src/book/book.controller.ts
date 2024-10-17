import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Schemas/book.schema';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/Schemas/user.schema';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum.ts/role.enum';
import { Throttle } from '@nestjs/throttler';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() body: CreateBookDto, @Req() req: any): Promise<Book> {
    console.log(req);
    return this.bookService.createBook(body, req.user);
  }
  // @Throttle({ default: { limit: 3, ttl: 6 * 1000 } })
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }
  @Roles(Role.Moderator, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Put(':id')
  async updateBookById(
    @Param('id') id: string,
    @Body() body: UpdateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.bookService.updateById(id, body, req.user);
  }
  @Delete(':id')
  async deleteBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
  // @Put('upload/:id')
  // @UseGuards(AuthGuard())
  // async uploadImages(@Param(':id') id: string , @UploadedFiles() files: Array<Express>){}
}
