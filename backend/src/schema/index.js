import { gql } from 'apollo-server-express'

import userSchema from './user'
import messageSchema from './message'

export const typeDefs = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`
export default [typeDefs, userSchema, messageSchema]
