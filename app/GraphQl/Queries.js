const { UserSession, Message } = model("");
const { HashPassword, compare, options, assignToken } = helper("UserHelpers");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, graphql } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const { SessionType, MessagesType } = require('../GraphQl/Types');
const { Op } = require('sequelize');




// // USER LOGOUT //

const LogoutType = new GraphQLObjectType({
    name: 'Logout',
    description: 'Logout Query',
    fields: () => ({
        logout: {
            type: SessionType,
            description: 'user session',
            resolve: async (parent, args, context) => {
                try {
                    if (context.cookies.Token) {
                        const session = await UserSession.findOne({ where: { token: context.cookies.Token } });
                        if (session) {
                            await session.destroy();
                            return { message: { status: 'success', message: 'user logout successfully' } };
                        } else {
                            return { message: { status: 'failed', message: 'please login first' } };
                        }
                    }
                } catch (err) {
                    return { message: { status: 'failed', message: err.message } };
                }

            }
        }
    })
});




//  USER LIVE MESSAGES //

const LiveMessageType = new GraphQLObjectType({
    name: 'Messages',
    description: 'Live Messages',
    fields: () => ({
        liveMessages: {
            type: new GraphQLList(MessagesType),
            args: {
                user1: { type: new GraphQLNonNull(GraphQLInt) },
                user2: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args, context) => {
                const messages = await Message.findAll({ where: { [Op.or]: [{ sender_id: args.user1, receiver_id: args.user2 }, { sender_id: args.user2, receiver_id: args.user1 }] } });
                return messages;
            }
        }
    })
});




// //  DEACTIVATE USER ACCOUNT //

// const DeactiveType = new GraphQLObjectType({
//     name: 'Deactive',
//     description: 'Deactive Account',
//     fields: () => ({
//         deleteUser: {
//             type: UserType,
//             resolve: async (parent, args, context) => {
//                 console.log(context.user.id)
//                 const user = await Users.findOne({ where: { id: context.user.id } });
//                 await UserSession.destroy({ where: { [Op.and]: { token: context.cookies.Token, user_id: user.id } } });
//                 await user.destroy();
//                 return { message: { status: 'success', message: 'account deacvtivated successfully' } };
//             }
//         }
//     })
// });








module.exports = {
    // RootQueryType,
    // LoginType,
    // SignupType,
    LogoutType,
    LiveMessageType
    // PasswordType,
    // DeactiveType,
    // TeacherCourses,
    // EnrollCourse
}