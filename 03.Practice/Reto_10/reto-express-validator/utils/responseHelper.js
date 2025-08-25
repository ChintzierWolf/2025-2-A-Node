// utils/responseHelper.js

export const successResponse = (res, data, mensaje = "Operación exitosa", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    mensaje,
    data,
  });
};

export const errorResponse = (res, errors, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    errors,
  });
};

export const internalError = (res, mensaje = "Error interno del servidor") => {
  return res.status(500).json({
    success: false,
    error: mensaje,
  });
};