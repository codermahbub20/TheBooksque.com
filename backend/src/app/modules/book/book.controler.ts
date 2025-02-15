/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BookServices } from './book.service';
import sendResponse from '../../utils/sendResponse';
import CatchAsync from '../../utils/CatchAsync';

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
const getAllProducts = CatchAsync(async (req, res) => {
  // Add the author's ID to the blog data
  const result = await BookServices.getAllProductsInToDb(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Books fetched successfully',
    data: result,
  });
});

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
