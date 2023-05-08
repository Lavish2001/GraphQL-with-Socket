const { GraphQLSchema } = require('graphql');
const { SignupMutation, LoginMutation, sendMessageMutation } = require('../GraphQl/Mutation');
const { LogoutType, LiveMessageType } = require('../GraphQl/Queries');
const { RootQueryType } = require('../GraphQl/Types');



// LOGIN SCHEMA //

const loginSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: LoginMutation
});



// SIGNUP SCHEMA //

const signupSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: SignupMutation
});



// LOGOUT SCHEMA //

const logoutSchema = new GraphQLSchema({
    query: LogoutType
});



// LIVE MESSAGES SCHEMA //

const liveMessages = new GraphQLSchema({
    query: LiveMessageType
});



// SEND MESSAGES //

const sendMessage = new GraphQLSchema({
    query: RootQueryType,
    mutation: sendMessageMutation
});




// // CHANGE PASSWORD SCHEMA //

// const password = new GraphQLSchema({
//     query: PasswordType
// });



// // DEACTIVATE ACCOUNT SCHEMA //

// const deactivate = new GraphQLSchema({
//     query: DeactiveType
// });



// // TEACHERS ALL COURSES SCHEMA //

// const teacherCourse = new GraphQLSchema({
//     query: TeacherCourses
// });



// // STUDENTS ENROLL COURSES SCHEMA //

// const studentEnroll = new GraphQLSchema({
//     query: EnrollCourse
// });




module.exports = {
    signupSchema,
    loginSchema,
    logoutSchema,
    liveMessages,
    sendMessage
}
