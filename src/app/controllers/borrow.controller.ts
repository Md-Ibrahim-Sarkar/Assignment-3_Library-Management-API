
import express, { Request, Response } from "express"
import { errorHandle } from "../lib/errorHandle";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";





export const borrowRoute = express.Router()

borrowRoute.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!bookId || !quantity || !dueDate) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
      return;
    }

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return;
    }

    await book.updateCopies(quantity);
   
    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error: any) {
    errorHandle(error, req, res);
  }
});


borrowRoute.get('/', async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book', 
          totalQuantity: { $sum: '$quantity' }, 
        },
      },
      {
        $lookup: {
          from: 'books', 
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      { $unwind: '$bookInfo' },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookInfo.title',
            isbn: '$bookInfo.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error: any) {
    errorHandle(error, req, res);
  }
});
