//Show the database structure.
import { Schema, model, Types } from "mongoose";

const agentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  databaseAccessLevel: {
    type: Number,
    required: true,
  }
});

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  emergency_phone: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true
  },
  seat: {
    type: Number,
    required: true,
  }
});

const guideSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
  databaseAccessLevel: {
    type: Number,
    required: true,
  }
});

const destinationSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meals: {
    type: String,
    required: true
  },
  lodging: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Bus_id: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true,
  }
});

const busSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Tour_Guide: {
    type: String,
    required: true,
  },
  Total_Seat: {
    type: Number,
    required: true,
  },
  Empty_Seat: {
    type: Number,
    required: true,
  },
  Full_Seat: {
    type: Number,
    required: true,
  },
  Patent: {
    type: String,
    required: true,
  }
});

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userSchemaGoogleAuth = new Schema({
  email: { type: String, required: true },
  googleAccessToken: { type: String },
  googleRefreshToken: { type: String },
  googleScope: { type: String },
  googleTokenType: { type: String },
  googleIdToken: { type: String },
  googleExpiryDate: { type: String },
});

export const UserGoogleAuth = model("UserGoogleAuths", userSchemaGoogleAuth);
export const Agent = model("Agent", agentSchema);
export const Customer = model("Customer", customerSchema);
export const Guide = model("Guide", guideSchema);
export const Destination = model("Destination", destinationSchema);
export const Bus = model("Bus", busSchema);
export const User = model("Users", userSchema);
