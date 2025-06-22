import { Request, Response } from "express";


export function errorHandle(error: any, req:Request, res:Response) {

      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        const value = error.keyValue[field];
  
       return  res.status(400).json({
          message: 'Validation failed',
          success: false,
          error: {
            name: 'ValidationError',
            errors: {
              [field]: {
                message: `${field.toUpperCase()} must be unique`,
                name: 'ValidatorError',
                properties: {
                  message: `${field.toUpperCase()} must be unique`,
                  type: 'unique',
                },
                kind: 'unique',
                path: field,
                value: value,
              },
            },
          },
        });
        return;
      }
  

      if (error.name === 'ValidationError') {
       return res.status(400).json({
          message: 'Validation failed',
          success: false,
          error: {
            name: error.name,
            errors: error.errors,
          },
        });
        return;
      }
  
      return res.status(500).json({
        message: error.message || 'Internal server error',
        success: false,
        error: {
          name: error.name || 'Error',
          message: error.message || 'Something went wrong',
        },
      });
    };