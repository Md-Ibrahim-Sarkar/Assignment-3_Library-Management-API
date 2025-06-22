import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
import { errorHandle } from "../lib/errorHandle";
import { Query } from "mongoose";


export const bookRoutes = express.Router();

bookRoutes.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const book = await Book.create(data);

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error: any) {
    errorHandle(error, req, res);
  }
});



bookRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const { filter, sortBy , sort, limit ,  } = req.query;

    let query: Record<string, any> = {};

    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query).sort({ [sortBy as string]: sort === 'asc' ? 1: -1  }).limit(Number(limit));

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error: any) {
    errorHandle(error, req, res);
  }
})

bookRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: book,
    });
  } catch (error: any) {
    errorHandle(error, req, res);
  }
})


bookRoutes.put('/:bookId', async (req: Request, res: Response): Promise<void>  => {
  try {
    const bookId = req.params.bookId;
    const updatedData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (error: any) {
    errorHandle(error, req, res);
  }
});


bookRoutes.delete('/:bookId', async (req: Request, res: Response): Promise<void> => {
    try {
      const bookId = req.params.bookId;
      const deleteData = await Book.findOneAndDelete({_id: bookId});

      if (!deleteData) {
        res.status(404).json({
          success: false,
          message: 'Book not found',
          data: null,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: null,
      });
    } catch (error: any) {
      errorHandle(error, req, res);
    }
  }
);