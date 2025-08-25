import { validationResult } from "express-validator";
import { errorResponse } from "../utils/responseHelper.js";

export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  /*
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  */

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
      value: error.value,
    }));

    return errorResponse(res, formattedErrors);
  }

  next();
};