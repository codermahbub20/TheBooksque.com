import { Book } from './book.interface';
import { BookModel } from './book.model';

const createProductsInToDb = async (book: Book) => {
  const result = await BookModel.create(book);
  return result;
};

// get all products in database

const getAllProductsInToDb = async (searchTerm: string) => {
  try {
    let query = {};

    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      query = {
        $or: [
          { title: { $regex: regex } },
          { author: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      };
    }
    const result = await BookModel.find(query);
    if (result.length === 0) {
      throw new Error('No Book matched your search criteria.');
    }
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error fetching Book: ${error.message}`);
  }
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
