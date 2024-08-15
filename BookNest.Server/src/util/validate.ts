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
export const validateEditorial = [
  body('nombre').notEmpty().withMessage('Nombre es obligatorio'),
  body('pais').notEmpty().withMessage('Pais es obligatoria'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createErrorResponse('Hubo errores en el formulario', 400, errors.array()));
    }
    next();
  }
]
export const validatePerson = [
  body('nombre').notEmpty().withMessage('Nombre es obligatorio'),
  body('apellido').notEmpty().withMessage('Apellido es obligatorio'),
  body('edad').notEmpty().withMessage('Edad es obligatoria'),
  body('fCumpleaños').notEmpty().withMessage('Fecha de cumpleaños es obligatoria'),
  body('username').notEmpty().withMessage('Username es obligatorio'),
  body('password').notEmpty().withMessage('Email debe ser una dirección válida'),
  body('email').isEmail().withMessage('Email debe ser una dirección válida'),
  body('genero').notEmpty().withMessage('Genero es obligatorio'),
  body('paisOrigen').notEmpty().withMessage('Pais de origen debe ser una cadena de texto'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createErrorResponse('Hubo errores en el formulario', 400, errors.array()));
    }
    next();
  }
]
