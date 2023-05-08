let port = 2222;
const io = require('socket.io')(port, {
    cors: {
        origin: "http://localhost:9000"
    },
});

console.log(`Your Socket is running on port ${port}`)

const users = [];

const alreadyExist = (id, username, socketId) => {
    const data = users.find((item) => {
        return item.id === id
    });
    if (!data) {
        users.push({ id, username, socketId })
    } else {
        let index = users.findIndex((item) => {
            return item.id === id
        });
        if (index != -1) {
            users.splice(index, 1);
            users.push({ id, username, socketId })
        }
    }
};

const findSocketId = (id) => {
    const data = users.find((item) => {
        return item.id === id
    });
    if (data) {
        return data
    }
};


const findUserWithSocketId = (id) => {
    const data = users.find((item) => {
        return item.socketId === id
    });
    if (data) {
        return data
    }
};

io.on('connection', socket => {

    // Online Users //
    socket.on('online-users', data => {
        alreadyExist(data.id, data.username, data.socketId);
        io.emit('online-user-details', users)
    });


    // Disconnect event
    socket.on('user-logout', data => {
        const index = users.findIndex((item) => {
            return item.id === data.id
        });
        if (index !== -1) {
            users.splice(index, 1);
            io.emit('online-user-details', users);
        }
    });


    // Online Users //
    socket.on('live-chat', async data => {
        let user = findSocketId(data.id);
        let user2 = findUserWithSocketId(socket.id);
        io.to(user.socketId).emit('send-live-chat', { 'messages': data.messages, userId: user2.id });
        socket.emit('send-live-chat', { 'messages': data.messages, userId: user.id })
    });


});











// const { buildSchema } = require('graphql');
// const ws = require('ws'); // yarn add ws
// const { useServer } = require('graphql-ws/lib/use/ws');

// // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     user(email: String!, password: String!): UserResult
//   }

//   type UserResult {
//     message: Message!
//   }

//   type Message {
//     status: String!
//     message: String!
//   }
// `);

// // The roots provide resolvers for each GraphQL operation
// const roots = {
//     query: {
//         user: (_, { email, password }) => {
//             // Here you would include code to query a database or other data source to authenticate the user
//             // and return the appropriate response based on whether the authentication was successful or not.
//             const isAuthenticated = true; // Example authentication result
//             if (isAuthenticated) {
//                 return { message: { status: 'success', message: 'User authenticated.' } };
//             } else {
//                 return { message: { status: 'error', message: 'Invalid email or password.' } };
//             }
//         }
//     },
// };

// const server = new ws.Server({
//     port: 4000,
//     path: '/graphql'
// });

// useServer({ schema, roots }, server);

// console.log('Listening to port 4000');






// const { createSchema, createYoga } = require('graphql-yoga');
// const { createServer } = require('node:http');
// const messages = [];


// const yoga = createYoga({
//     schema: createSchema({
//         typeDefs: `
//       type Query {
//         message: String
//       }
//     `,
//         resolvers: {
//             Query: {
//                 message: () => 'Hello from Yoga!'
//             }
//         }
//     })
// })

// const server = createServer(yoga)

// server.listen(4000, () => {
//     console.info('Server is running on http://localhost:4000/graphql')
// })








// const { createSchema, createYoga } = require('graphql-yoga');
// const { createServer } = require('node:http');
// const messages = [];


// const yoga = createYoga({
//     schema: createSchema({
//         typeDefs: `
//       type Message {
//         id: ID!
//         text: String!
//         senderId: ID!
//         receiverId: ID!
//       }

//       type Query {
//         message(id: ID!): Message
//         messages(senderId: ID!, receiverId: ID!): [Message]!
//       }

//       type Mutation {
//         sendMessage(text: String!, senderId: ID!, receiverId: ID!): Message!
//       }
//     `,
//         resolvers: {
//             Query: {
//                 message: (parent, args) => messages.find(message => message.id === args.id),
//                 messages: (parent, args) => messages.filter(message => message.senderId === args.senderId && message.receiverId === args.receiverId),
//             },
//             Mutation: {
//                 sendMessage: (parent, args) => {
//                     const message = {
//                         id: String(messages.length + 1),
//                         text: args.text,
//                         senderId: args.senderId,
//                         receiverId: args.receiverId,
//                     };
//                     messages.push(message);
//                     console.log(messages)
//                     return message;
//                 }
//             }
//         }
//     })
// })

// const server = createServer(yoga);

// server.listen(4000, () => {
//     console.info('Server is running on http://localhost:4000/graphql')
// })
