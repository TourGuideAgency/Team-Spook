import { sanitize } from "./../utils/sanitize.js";
import { User } from "../models/collections.js";
import { ManageQueryAnswer } from "../utils/ErrorHandling/typesErrors/NotFoundErrorHandling.js";
import { ErrorHandling } from "../utils/ErrorHandling/ErrorHandling.js";
import { UserGoogleAuth } from "../models/collections.js";

export const userResolvers = {
  Mutation: {
    registerUser: async (_, args) => {
      const sanitizedArgs = sanitize(args);
      const { email, password } = sanitizedArgs;
  
      // Verificar si el correo electrónico ya está registrado
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("A user with that email already exists");
      }
  
      const user = new User({ email, password });
      return await user.save();
    },
    registerUserGoogleAuth: async (_, args) => {
      console.log(args); // Verificar si se reciben los argumentos correctamente
      const sanitizedArgs = sanitize(args);
      const { email,googleAccessToken, googleRefreshToken, googleScope, googleTokenType, googleIdToken, googleExpiryDate } = sanitizedArgs;
      const user = new UserGoogleAuth ({
        email,
        googleAccessToken,
        googleRefreshToken,
        googleScope,
        googleTokenType,
        googleIdToken,
        googleExpiryDate,
      });
      console.log('User:', user);
      return await user.save();
      
    }

  },
  Query: {
    getUserbyEmail: async (_: void, args) => {
      try {
        const user = await User.findOne({
          email: encodeURIComponent(args.email),
        });
        return ManageQueryAnswer(user, "users");
      } catch (error) {
        ErrorHandling(error);
      }
    },
      getUserAuthByGoogleIdToken: async (_, { googleTokenId }) => {
        return await UserGoogleAuth.findOne({ googleTokenId });
      },
    }
};
