const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const { User } = model("");
const { Op } = require('sequelize');


// SESSION TYPE //

const SessionType = new GraphQLObjectType({
    name: 'UserSession',
    description: 'sessions',
    fields: () => ({
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
        token: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: MessageType }
        // add other fields as needed
    }),
});



// USER TYPE //

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'user',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        currPassword: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: MessageType }
        // add other fields as needed
    }),
});



// USER MESSAGES TYPE //

const MessagesType = new GraphQLObjectType({
    name: 'messages',
    description: 'user live messages',
    fields: () => ({
        id: { type: (GraphQLInt) },
        sender_id: { type: (GraphQLInt) },
        receiver_id: { type: (GraphQLInt) },
        text: { type: (GraphQLString) },
        user: {
            type: UserType,
            resolve: async (parent, args) => {
                return User.findOne({ where: { id: parent.sender_id } })
            }
        },
        message: { type: MessageType }
    })
});



// ROOT QUERY TYPE //

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        forall: {
            type: GraphQLString,
            resolve: () => null
        }
    }
});



// MESSAGE TYPE //

const MessageType = new GraphQLObjectType({
    name: 'Message',
    description: 'A success/failure message',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString },
        result: { type: UserType }
    })
});



module.exports = {
    UserType,
    RootQueryType,
    SessionType,
    MessageType,
    MessagesType
}