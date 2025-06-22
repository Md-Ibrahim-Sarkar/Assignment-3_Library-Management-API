

export interface IBook  {
  title: string; 
  author: string;
  genre: string; 
  isbn: string; 
  description?: string; 
  copies: number; 
  available: boolean; 
}


export interface bookCopiesInstanceMethods {
  updateCopies: (quantity: number) => Promise<void>;
}