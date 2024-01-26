// schemas/inputTypes.js

const { gql } = require('apollo-server-express');

const inputTypes = gql`
  input BookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }
`;

module.exports = inputTypes;
