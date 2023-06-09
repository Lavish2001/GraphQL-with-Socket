const express = require("express");
const router = express.Router();
const loginAuth = middleware("loginAuth");
const { graphqlHTTP } = require('express-graphql');
const { loginSchema, signupSchema, logoutSchema, liveMessages, sendMessage, deactivate } = require('../app/GraphQl/Schema');


// USER SIGNUP //

router.post('/signup', graphqlHTTP({
    schema: signupSchema,
    graphiql: true,
    rootValue: true
})
);



// USER LOGIN //

router.post('/login', graphqlHTTP({
    schema: loginSchema,
    graphiql: true,
    rootValue: true
})
);



// USER LOGOUT //

router.post('/logout', loginAuth, graphqlHTTP({
    schema: logoutSchema,
    graphiql: true,
    rootValue: true
})
);



// USER LIVE MESSAGES //

router.post('/user-live-messages', loginAuth, graphqlHTTP({
    schema: liveMessages,
    graphiql: true,
    rootValue: true
})
);



// SEND MESSAGES //

router.post('/send-messages', loginAuth, graphqlHTTP({
    schema: sendMessage,
    graphiql: true,
    rootValue: true
})
);




// // TOTAL LOGIN COUNT //

// router.get('/getlogincount', loginAuth, (req, res) => {
//   return ucontroller.loginCount(req, res);
// });



// // LOGOUT FROM ANOTHER DEVICES //

// router.delete('/logout-other-devices', loginAuth, (req, res) => {
//   return ucontroller.logoutOtherDevices(req, res);
// });



// // UPDATE USER DETAILS //

// router.post('/changepassword', loginAuth, graphqlHTTP({
//   schema: password,
//   graphiql: true,
//   rootValue: true
// })
// );



// // DEACTIVATE ACCOUNT //

// router.post('/deactivate', loginAuth, graphqlHTTP({
//   schema: deactivate,
//   graphiql: true,
//   rootValue: true
// })
// );



module.exports = router;
