import { google } from 'googleapis';
import path from 'path';
import { readFileSync, writeFile } from 'fs';
import { ParsedQs } from 'qs';

// Read the Google credential data from the JSON file
// Lee los datos de las credenciales de Google desde el archivo JSON
const credentialsPath = path.join(process.cwd(),process.env.NODE_ENV === "development" ? 'credentials.json':"./credentials.json" );
const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
const REDIRECT_URI_DEV ='http://localhost:4000/auth/google/redirect';
const REDIRECT_URI ='https://tourismagency2023.onrender.com/auth/google/redirect';
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile'];

// OAuth 2.0 Configuration
// Configuración de OAuth 2.0
const oAuth2Client = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    process.env.NODE_ENV === "development"
      ? REDIRECT_URI_DEV
      : REDIRECT_URI
);

// Google authorization function
// Función de autorización de Google
export async function authorizeWithGoogle(code) {
  const { tokens } = await oAuth2Client.getToken(code.toString());
  oAuth2Client.setCredentials(tokens);
  // Returns access tokens
  // Devuelve los tokens de acceso
  console.log(tokens)
  return tokens;
}

// Google Authentication Path
// Ruta de autenticación de Google
export function getGoogleAuthUrl() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
}

// Function to save access tokens to a file
// Función para guardar los tokens de acceso en un archivo
async function saveCredentials(credentials) {
    const tokenPath = path.join(process.cwd(), 'token.json');
    const tokenString = JSON.stringify(credentials);
    await writeFile(tokenPath, tokenString, (err) => {
      if (err) return console.error(err);
      console.log('Tokens stored to', tokenPath);
    });
  }

