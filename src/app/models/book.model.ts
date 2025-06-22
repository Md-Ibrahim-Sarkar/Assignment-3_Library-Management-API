import { Model, model, Schema } from "mongoose";
import { IBook, bookCopiesInstanceMethods } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, Model<IBook>, bookCopiesInstanceMethods>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        'FICTION',
        'NON_FICTION',
        'SCIENCE',
        'HISTORY',
        'BIOGRAPHY',
        'FANTASY',
      ],
      default: 'FANTASY',
    },
    isbn: { type: String, required: true, unique: true, immutable: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, 'Copies must be a positive number'],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// instance method 
bookSchema.method('updateCopies', async function (quantity: number) {

  if (this.copies < quantity) {
    throw new Error('Not enough copies available');
  }

  this.copies -= quantity;
  await this.save();
});


// pre middleware

bookSchema.pre('save', async function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
})

// post middleware

bookSchema.post('findOneAndDelete', function (doc) {
  if (doc) {
    console.log(`Book with id ${doc._id} was deleted`);
  }
});

export const Book = model('Book', bookSchema);
