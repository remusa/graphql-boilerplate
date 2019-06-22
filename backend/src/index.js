import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import helmet from 'helmet'

import 'dotenv/config'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'

const server = new ApolloServer({
    cors: false,
    typeDefs,
    resolvers,
    // context: ({ req, res }) => ({ req, res }),
    context: {
        me: {
            id: '1',
            username: 'Robin Wieruch',
        },
    },
})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }))

const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'"],
            scriptSrc: ["'self'"],
        },
    },
}
app.use(helmet())

server.applyMiddleware({ app, cors: false, path: '/graphql' })

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
})

// Decode JWT and pass it to each request
// app.use((req, res, next) => {
//     const { token } = req.cookies
//     if (token) {
//         const { userId } = jwt.verify(token, process.env.APP_SECRET)
//         req.userId = userId
//     }
//     next()
// })

// Populate the user on each request
// app.use(async (req, res, next) => {
//     if (!req.userId) return next()
//     const user = await db.query.user(
//         { where: { id: req.userId } },
//         '{ id, email, name, permissions }'
//     )
//     req.user = user
//     next()
// })
