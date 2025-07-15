export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 400, public details?: any) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: number | string) {
    super(`${resource}${id ? ` con ID ${id}` : ''} no encontrado`, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, details);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, originalError?: any) {
    super(`Error de base de datos: ${message}`, 500, originalError);
  }
}