import mongoose from 'mongoose'; // Importar mongoose para realizar la consulta
import { UserGoogleAuth } from '../../models/collections.js';

export const requireGoogleAuth = async (req, res, next) => {
  const link = "https://tourismagency2023.onrender.com";
  const userId = req.session.userId; // Read user ID from session. Leer el ID del usuario desde la sesión

  if (!userId) {
    // If userid is not in session, redirect to google authentication path. Si el identificador de usuario no está en la sesión, redirigir a la ruta de autenticación de Google
    res.redirect(`${link}/auth/google`);
  } else {
    // Check if the googleTokenId is stored in the database. Verificar si el googleTokenId está almacenado en la base de datos
    const user = await UserGoogleAuth.findOne({ googleTokenId: userId });

    if (!user) {
      // If the googleTokenId is not in the database, redirect to the google auth route. Si el googleTokenId no está en la base de datos, redirigir a la ruta de autenticación de Google
      res.redirect(`${link}/auth/google`);
    } else {
      // If the googleTokenId is in the database, continue with the next middleware function. Si el googleTokenId está en la base de datos, continuar con la siguiente función middleware
      next();
    }
  }
};





