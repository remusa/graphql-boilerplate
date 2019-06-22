import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String
        password: String
        messages: [Message!]
    }

    type Message {
        id: ID!
        text: String!
        user: User!
    }

    type Query {
        me: User
        user(id: ID!): User
        users: [User!]

        message(id: ID!): Message!
        messages: [Message!]!
    }

    type Mutation {
        # register(email: String!, password: String!): User!
        # login(email: String!, password: String!): User
        # logout: Boolean!

        createMessage(text: String!): Message!
        deleteMessage(id: ID!): Message!
    }
`
