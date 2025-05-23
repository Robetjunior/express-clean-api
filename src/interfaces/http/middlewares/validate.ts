import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';

interface ValidationSchemas {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

export const validate = (schemas: ValidationSchemas): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
};
