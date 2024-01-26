import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreatUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      email
      password
      id
    }
  }
`;

export const CREATE_DECK = gql`
  mutation CreateDeck($input: NewDeck!) {
    createDeck(input: $input) {
      id
      userId
      lastUpdate
      flashcards {
        front
        back
      }
      name
    }
  }
`;
export const DELETE_DECK = gql`
  mutation DeleteDeckByUser($deckId: String!) {
    deleteDeckByUser(deckId: $deckId) {
      id
      userId
      lastUpdate
      flashcards {
        front
        back
      }
      name
    }
  }
`;

export const DELETE_ALL_DECKS = gql`
  mutation DeleteAllDecksByUser($userId: String!) {
    deleteAllDecksByUser(userId: $userId) 
      
    
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId) 
    
  }
`;

export const GET_USERS_DECK = gql`
  query GetDeckByUser($userId: String!) {
    getDeckByUser(userId: $userId) {
      id
      dateCreated
      lastUpdate
      flashcards {
        front
        back
      }
      name
      userId
    }
  }`;

export const GET_DECK_BY_ID = gql`
query GetDeckById($id: String!){
  getDeckById(id: $id){
    id
    dateCreated
    lastUpdate
    flashcards {
      front
      back
    }
    name
    userId
  }
}`;

export const COMMENT_SUBSCRIPTION = gql`
subscription Comment {
  comment {
    id, userId, comment
  }
}`;