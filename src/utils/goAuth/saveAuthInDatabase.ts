import { userResolvers } from "../../graphql-schema/userResolvers.js";
import { authorizeWithGoogle } from "./google-auth.js";

export async function saveAuthInDatabase(req, res) {
    const { code } = req.query as { code: string };
    const { tokens, email } = await authorizeWithGoogle(code);
    try {
      await userResolvers.Mutation.registerUserGoogleAuth(null, {
        email: email,
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        googleScope: tokens.scope,
        googleTokenType: tokens.token_type,
        googleIdToken: tokens.id_token,
        googleExpiryDate: new Date(tokens.expiry_date),
      });
      console.log("Tokens saved in the database. Tokens guardados en la base de datos");
      req.session.userId = tokens.id_token; // Save user ID in session. Guardar el ID del usuario en la sesión.
      console.log("Session saved. Sesión guardada");
      res.redirect("/graphql");
    } catch (error) {
      console.error(error);
    }
  }
  
  