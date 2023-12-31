

import { gql, DocumentNode } from '@apollo/client';
export const LOGIN_MUTATION: DocumentNode = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    sellerAuthTokenCreate(email: $username, password: $password) {
        
            success
            message
        
        
    }
  }
`;

export const REGISTER_MUTATION: DocumentNode = gql`
  mutation RegisterMutation(
    $name: String!
    $email: String!
    $phone: String!
    $password: String!
    $receiveWhatsAppUpdates: Boolean!
  ) {
    sellerAuthRegister(
      name: $name
      email: $email
      phone: $phone
      password: $password
      whatsAppMarketing: $receiveWhatsAppUpdates
    ) {
        success
        message
      
    }
  }
`;
