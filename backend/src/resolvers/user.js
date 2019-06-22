// # register(email: String!, password: String!): User!
//         # login(email: String!, password: String!): User
//         # logout: Boolean!

export default {
    Query: {
        users: (parent, args, { models }) => Object.values(models.users),
        user: (parent, { id }, { models }) => models.users[id],
        me: (parent, args, { me }) => me,
    },

    User: {
        messages: (user, args, { models }) =>
            Object.values(models.messages).filter(message => message.userId === user.id),
    },
}
