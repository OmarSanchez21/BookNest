import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from '../util/apiResponse';

export const validateAutor = [
  body('nombre').notEmpty().withMessage('Nombre es obligatorio'),
  body('apellido').notEmpty().withMessage('Apellido es obligatorio'),
  body('biografia').notEmpty().withMessage('Biografia es obligatoria'),
  body('fechaNacimiento').isISO8601().withMessage('Fecha de nacimiento debe ser una fecha válida'),
  body('genero').notEmpty().withMessage('Genero es obligatorio'),
  body('paisOrigen').notEmpty().withMessage('Pais de origen debe ser una cadena de texto'),
  body('libros').isArray().withMessage('Los libros deben ser un array de IDs'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createErrorResponse('Hubo errores en el formulario', 400, errors.array()));
    }
    next();
  }
];
