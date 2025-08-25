import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";
import { successResponse, internalError } from "../utils/responseHelper.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, edad, contraseña } = req.body;

    /*
    // Aquí iría la lógica para guardar en base de datos
    // Por ahora solo simulamos el éxito

    res.status(201).json({
      success: true,
      mensaje: "Usuario registrado con éxito",
      data: {
        nombre,
        correo,
        edad,
        // No devolver la contraseña por seguridad
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al registrar usuario",
    });
  }
  */
    // Verificar si el correo ya está registrado
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: "correo",
            message: "El correo ya está registrado",
          },
        ],
      });
    }

    // Hashear la contraseña antes de guardar
    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      edad,
      contraseña: contraseñaHash,
    });

    await nuevoUsuario.save();

    // No deolver la contraseña como respuesta
    return successResponse(res, { nombre, correo, edad }, "Usuario registrado con éxito", 201);
  } 

  catch (error) 
  {
    console.error("❌ Error al registrar usuario:", error);
    return internalError(res, "Error al registrar usuario");
  }

};