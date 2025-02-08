/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BookServices } from './book.service';

const createProducts = async (req: Request, res: Response) => {
  try {
    // received response data from clients
    const book = req.body;
    // send the data in services function to save this data in mongodb
    const result = await BookServices.createProductsInToDb(book);
    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: error,
    });
  }
};

// Get all products in to the database
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    // Pass the searchTerm to the service
    const result = await BookServices.getAllProductsInToDb(
      searchTerm as string,
    );

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: err.message,
    });
  }
};

// Get single products in to the database

const getSingleProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const productId = req.params.productId; // Make sure this matches the route parameter
    const result = await BookServices.getSingleProductsIntoDb(productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
    });
  }
};

// Get updated products in to the database
const getUpdatedProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const data = req.body;
    const result = await BookServices.getUpdatedProductIntoDb(productId, data);
    res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete single products in to the database
const deleteSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await BookServices.deleteProductIntoDb(productId);
    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);
  }
};

export const BookControllers = {
  createProducts,
  getAllProducts,
  getSingleProducts,
  getUpdatedProduct,
  deleteSingleProducts,
};
