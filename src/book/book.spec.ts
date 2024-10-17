// import { Test, TestingModule } from '@nestjs/testing';
// import { BookService } from './book.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { Book } from './Schemas/book.schema';
// import { Model } from 'mongoose';

// describe('BookService', async () => {
//     let mockBook = {
//         _id: '670e97eb7eeae90eaa1293e0',
//         title: 'how are you',
//         description: 'hello world',
//         author: 'Sameer Memon',
//         price: 400,
//         category: 'Fantasy',
//         createdAt: '2024-10-15T16:27:23.082Z',
//         updatedAt: '2024-10-16T18:56:48.811Z',
//         __v: 0,
//       };
//     let bookService : BookService
//     let model: Model<Book>
//   beforeEach(async () => {
//     let mockBookService = { findById: jest.fn() };
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       // controllers: [CatsController],
//       providers: [
//         BookService,
//         {
//           provide: getModelToken(Book.name),
//           useValue: mockBookService,
//         },
//       ],
//     }).compile();
    
//     bookService = moduleRef.get<BookService>(BookService)
//     model = moduleRef.get<Model<Book>>(getModelToken(Book.name))
//   });

//   describe('findById', () =>{
// it('should find and return a book by ID', async () =>{
//     jest.spyOn(model , 'findById').mockResolvedValue(mockBook)

//     const result 
// })
//   })
// });
