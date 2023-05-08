const { User, UserSession, Message } = model("");
const { HashPassword, compare, options, assignToken } = helper("UserHelpers");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, graphql } = require('graphql');
const { UserType, MessagesType } = require('../GraphQl/Types');
const { Op } = require('sequelize');




// USER SIGNUP MUTATION //

const SignupMutation = new GraphQLObjectType({
    name: 'Signup',
    description: 'Signup Mutation',
    fields: () => ({
        signup: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args, context) => {
                try {
                    const exist = await User.findOne({ where: { email: args.email } });
                    if (exist) {
                        return { message: { status: 'failed', message: 'email already exists' } };
                    };
                    if (args.username && args.password && args.email) {
                        const hash = await HashPassword(args.password);
                        await User.create({
                            username: args.username,
                            email: args.email,
                            password: hash,
                            role: args.role
                        });
                        return { message: { status: 'success', message: 'user signup successfully' } };
                    } else {
                        return { message: { status: 'failed', message: 'All fields are mandatory' } };
                    }
                } catch (err) {
                    return { message: { status: 'failed', message: err.message } };
                }
            }
        }
    })
});




// USER LOGIN MUTATION //

const LoginMutation = new GraphQLObjectType({
    name: 'Login',
    description: 'Login Mutation',
    fields: () => ({
        login: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args, context) => {
                try {
                    if (context.cookies.Token) {
                        const userSession = await UserSession.findOne({ where: { token: context.cookies.Token } });
                        if (userSession) {
                            const user = await User.findOne({ where: { id: userSession.user_id } })
                            return { message: { status: 'success', message: 'User login successfully', result: user } };
                        }
                    };
                    if (args.email && args.password) {
                        const exist = await User.findOne({ where: { email: args.email } });
                        if (exist) {
                            const check = await compare(args.password, exist.password);
                            if (check) {
                                const token = await assignToken(exist.id);

                                // Set the cookie in the response //
                                context.res.cookie('Token', token, options);

                                await UserSession.create({
                                    user_id: exist.id,
                                    token: token
                                });

                                return { message: { status: 'success', message: 'User login successfully', result: exist } };
                            } else {
                                return { message: { status: 'failed', message: 'Incorrect Password' } };
                            }
                        } else {
                            return { message: { status: 'failed', message: 'Incorrect credentials' } };
                        }
                    } else {
                        return { message: { status: 'failed', message: 'All fields are mandaory' } };
                    }
                } catch (err) {
                    return { message: { status: 'failed', message: err.message } };
                }

            }
        }
    })
});





// USER SEND MESSAGES //

const sendMessageMutation = new GraphQLObjectType({
    name: 'SendMessage',
    description: 'Send Messages to other users',
    fields: () => ({
        sendMessage: {
            type: MessagesType,
            args: {
                sender_id: { type: new GraphQLNonNull(GraphQLInt) },
                receiver_id: { type: new GraphQLNonNull(GraphQLInt) },
                text: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args, context) => {
                try {
                    await Message.create({
                        sender_id: args.sender_id,
                        receiver_id: args.receiver_id,
                        text: args.text
                    });
                    return { message: { status: 'success', message: 'Message Sent' } };
                } catch (err) {
                    return { message: { status: 'failed', message: err.message } };
                }
            }
        }
    })
});









module.exports = {
    SignupMutation,
    LoginMutation,
    sendMessageMutation
}