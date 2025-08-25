import express from "express";
import { body } from "express-validator";
import { registrarUsuario } from "../controllers/registroController.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

// Validaciones
const validacionesRegistro = [
  body("nombre")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("correo")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Debe ser un correo válido"),

  body("edad")
    .isInt({ min: 18, max: 99 })
    .withMessage("La edad debe ser un número entre 18 y 99"),

  body("contraseña")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("La contraseña debe incluir mayúsculas, minúsculas y números"),


];

// Ruta POST /registro
router.post("/registro", validacionesRegistro, validarCampos, registrarUsuario);

export default router;

