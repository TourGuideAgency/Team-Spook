import { ApolloClient, InMemoryCache,gql } from '@apollo/client';

export const GET_ALL_AGENTS = gql`
  query {
    getAllAgents {
      _id
      email
      password
      firstName
      lastName
      phone
      databaseAccessLevel
    }
  }
`;
export const GET_ALL_CUSTOMERS = gql`
  query {
    getAllcustomers {
      _id
      firstName
      lastName
      email
      phone
      emergency_phone
      passport
      seat
    }
  }
`;
export const GET_ALL_GUIDES = gql`
  query {
    getAllGuides {
      _id
      firstName
      lastName
      email
      phone
      languages
      bio
      databaseAccessLevel
    }
  }
`;
export const GET_ALL_DESTINATIONS = gql`
  query {
    getAllDestinations {
      _id
      country
      city
      currency
      language
      description
      meals
      lodging
      price
      Bus_id
      image
    }
  }
`;
export const REGISTER_USER = gql`
  mutation registerUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      email
      password
    }
  }
`;



const client = new ApolloClient({
  uri: process.env.NODE_ENV==="development" ? 'http://localhost:4000/graphql': 'https://onrenderserver/graphql', // url graphql server 
  cache: new InMemoryCache()
});

export default client;
