import cookieParser from "cookie-parser";
import session from 'express-session';
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { getGoogleAuthUrl } from "./utils/goAuth/google-auth.js";
import { mongoConnect } from "./db/index.js";
import { busResolvers } from "./graphql-schema/busResolvers.js";
import { typeDefs } from "./graphql-schema/typeDefs.js";
import { customerResolvers } from "./graphql-schema/customerResolvers.js";
import { guideResolvers } from "./graphql-schema/guideResolvers.js";
import { agentResolvers } from "./graphql-schema/agentResolvers.js";
import { serverErrorHandler } from "./utils/ErrorHandling/typesErrors/serverErrorHandler.js";
import { userResolvers } from "./graphql-schema/userResolvers.js";
<<<<<<< HEAD
import { getUserEmail } from "./utils/getUserEmail.js";
import { requireGoogleAuth, configureCookieParser } from "./utils/google-auth-middleware.js";

const app = express();
const port = 4000;

configureCookieParser(app); // Configurar middleware de cookies

mongoConnect();

// Ruta de autenticación de Google
// Google OAuth Route
=======
import {
  requireGoogleAuth,
} from "./utils/goAuth/google-auth-middleware.js";
import { saveAuthInDatabase } from "./utils/goAuth/saveAuthInDatabase.js";

const app = express();
const port = 4000;
mongoConnect();
app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET_KEY, // Switch to a secure and secret string in production. Cambiar a una cadena segura y secreta en producción
  resave: false,
  saveUninitialized: false,
}));
// Google Authentication Path. Ruta de autenticación de Google
>>>>>>> bd40ef7e9f821846707d6853b782e802d247c496
app.get("/auth/google", (req, res) => {
  const authUrl = getGoogleAuthUrl();
  res.redirect(authUrl);
});

// Google authentication callback route
// Ruta de callback de autenticación de Google
app.get("/auth/google/redirect", saveAuthInDatabase, (req, res) => {
  res.redirect("/graphql");
});


app.get("/", requireGoogleAuth, (req, res) => {
  res.send("Welcome to Tourism Agency API");
});
<<<<<<< HEAD

app.get("/api-docs", requireGoogleAuth, (req, res) => {
  res.redirect(
    process.env.NODE_ENV === "development"
      ? `http://localhost:${port}/graphql`
      : `https://tourismagency2023.onrender.com/graphql`
  );
});

app.get("/graphql", requireGoogleAuth, (req, res) => {
  res.redirect(
    process.env.NODE_ENV == "development"
      ? `http://localhost:${port}/graphql`
      : `https://tourismagency2023.onrender.com/graphql`
  );
});
=======
app.get('/api-docs',(req,res)=>res.redirect(`https://tourismagency2023.onrender.com/graphql`))

>>>>>>> bd40ef7e9f821846707d6853b782e802d247c496

export async function start() {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: [
      busResolvers,
      agentResolvers,
      customerResolvers,
      guideResolvers,
      userResolvers,
    ],
    introspection: true,
  });
  mongoConnect();
  await server.start();
  server.applyMiddleware({ app });
  app.use(serverErrorHandler);
  app.get("*", (req, res) => res.send("404 not found"));
  app.listen({ port }, () => {
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

start();
