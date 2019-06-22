import uuidv4 from 'uuid/v4'

import userResolvers from './user'
import messageResolvers from './message'

const resolvers = {
    Query: {
        _: Boolean,
    },

    Mutation: {
        _: Boolean,
    },
}

export default [resolvers, userResolvers, messageResolvers]
