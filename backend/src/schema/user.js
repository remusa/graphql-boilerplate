import { gql } from 'apollo-server-express'

export default gql`
    type User {
        id: ID!
        username: String!
        messages: [Message!]
    }

    extend type Query {
        users: [User!]
        user(id: ID!): User
        me: User
    }
`
