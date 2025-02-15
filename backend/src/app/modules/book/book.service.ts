import QueryBuilder from '../../builder/QueryBuilder';
import { bookSearchableFields } from './book.constant';
import { Book } from './book.interface';
import { BookModel } from './book.model';

const createProductsInToDb = async (book: Book) => {
  const result = await BookModel.create(book);
  return result;
};

// get all products in database

const getAllProductsInToDb = async (query: Record<string, unknown>) => {
  const Books = new QueryBuilder(BookModel.find(), query)
    .search(bookSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await Books.modelQuery;

  return result;
};
// Get Specific id wise data into the database

const getSingleProductsIntoDb = async (_id: string) => {
  const result = await BookModel.findOne({ _id }); // Await the promise here
  return result;
};

// Get updated  data into the database

const getUpdatedProductIntoDb = async (_id: string, data: Partial<Book>) => {
  const result = await BookModel.findByIdAndUpdate(
    _id,
    { $set: data },
    { new: true },
  ).exec();
  return result;
};

// delete products using id   data into the database

const deleteProductIntoDb = async (_id: string) => {
  const result = BookModel.findByIdAndDelete({ _id });
  return result !== null;
};

export const BookServices = {
  createProductsInToDb,
  getAllProductsInToDb,
  getSingleProductsIntoDb,
  getUpdatedProductIntoDb,
  deleteProductIntoDb,
};
