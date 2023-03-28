/*** Define the structure of the queries (GET) and mutation (DELETE,PUT,POST) in graphql ***/
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
  }
  type UserGoogleAuth {
    _id: ID!
    email: String!
    googleAccessToken: String!
    googleRefreshToken: String!
    googleScope: String!
    googleTokenType: String!
    googleIdToken: String!
    googleExpiryDate: String
  }

  type Agent {
    _id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    phone: String
    databaseAccessLevel: Int
  }

  type Customer {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    emergency_phone: String
    passport: String
    seat: Int
  }

  type Guide {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    languages: String
    databaseAccessLevel: Int
  }

  type Destination {
    _id: ID
    country: String
    city: String
    currency: String
    language: String
    description: String
    meals: String
    lodging: String
    price: Int
    Bus_id: Int
    image: String
  }

  type Bus {
    _id: ID!
    Name: String!
    Description: String!
    Tour_Guide: String!
    Total_Seat: Int!
    Empty_Seat: Int!
    Full_Seat: Int!
    Patent: String!
  }

  type Query {
    getAllAgents: [Agent]
    getAgentbyId(id: ID!): Agent
    getAllcustomers: [Customer]
    getCustomerbyId(id: ID!): Customer
    getAllguides: [Guide]
    getGuidebyId(id: ID!): Guide
    getAllDestinations: [Destination]
    getDestinationbyId(id: ID!): Destination
    getAllBuses: [Bus]
    getBusesbyId(id: ID!): Bus
    getUserbyEmail(email: String!): User
    getUserAuthByGoogleIdToken(googleIdToken: String!): User
  }

  type Mutation {
    registerUserGoogleAuth(
      email: String!
      googleAccessToken: String!
      googleRefreshToken: String!
      googleScope: String!
      googleTokenType: String!
      googleIdToken: String!
      googleExpiryDate: String
    ): UserGoogleAuth!
    registerUser(email: String!, password: String!): User!
    createAgent(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      phone: String!
      databaseAccessLevel: Int!
    ): Agent!
    updateAgent(
      id: ID!
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      databaseAccessLevel: Int
    ): Agent!
    deleteAgent(id: ID!): String!
    createCustomer(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      emergency_phone: String!
      passport: String!
      seat: Int!
    ): Customer!
    updateCustomer(
      id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      emergency_phone: String
      passport: String
      seat: Int
    ): Customer!
    deleteCustomer(id: ID!): String!
    createGuide(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      languages: String!
      databaseAccessLevel: Int!
    ): Guide!
    updateGuide(
      _id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      languages: String
      databaseAccessLevel: Int
    ): Guide!
    deleteGuide(id: ID!): String!
    createDestination(
      country: String 
      city: String
      currency: String
      language: String
      description: String
      meals: String
      lodging: String
      price: Int
      Bus_id: Int
      image: String
    ): Destination!
    updateDestination(
      _id: ID
      country: String
      city: String
      currency: String
      language: String
      description: String
      meals: String
      lodging: String
      price: Int
      Bus_id: Int
      image: String
    ): Destination!
    deleteDestination(id: ID!): String!
    createBus(
      Name: String!
      Description: String!
      Tour_Guide: String!
      Total_Seat: Int!
      Empty_Seat: Int!
      Full_Seat: Int!
      Patent: String!
    ): Bus!
    updateBus(
      id: ID!
      Name: String
      Description: String
      Tour_Guide: String
      Total_Seat: Int
      Empty_Seat: Int
      Full_Seat: Int
      Patent: String
    ): Bus!
    deleteBus(id: ID!): String!
  }
`;
