import { gql } from 'apollo-server'
import uuidv4 from 'uuid/v4'

const users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
        messageIds: [1],
    },
    2: {
        id: '2',
        username: 'Dave Davids',
        messageIds: [2],
    },
}

let messages = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: 1,
    },
    2: {
        id: '2',
        text: 'By World',
        userId: 2,
    },
}

export const resolvers = {
    Query: {
        me: (parent, args, context, info) => context.me,
        user: (parent, args, context, info) => users[args.id],
        users: () => Object.values(users),
        message: (parent, args, context, info) => messages[args.id],
        messages: () => Object.values(messages),
    },
    User: {
        messages: user => Object.values(messages).filter(message => message.userId === user.id),
    },
    Message: {
        user: message => users[message.userId],
    },
    Mutation: {
        createMessage: (parent, args, context, info) => {
            const id = uuidv4()
            const message = {
                id,
                text: args.text,
                userId: context.me.id,
            }
            messages[id] = message
            users[context.me.id].messageIds.push(id)
            return message
        },
        deleteMessage: (parent, args, context, info) => {
            const { [args.id]: message, ...otherMessages } = messages
            if (!message) {
                return false
            }
            messages = otherMessages
            return message
        },
    },
}
