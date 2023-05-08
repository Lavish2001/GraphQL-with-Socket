const jwt = require('jsonwebtoken');
const { User } = require('../Models');

const loginAuth = async (req, res, next) => {

  let { Token } = req.cookies;
  try {

    if (Token) {

      // VERIFY TOKEN

      const { userId } = jwt.verify(Token, env('JWT_SECRET_KEY'));

      // GET USER FROM TOKEN

      req.user = await User.findOne({
        where: { id: userId }
      });
      next();
    }
    // IF TOKEN NOT RECEIVE

    else {
      return res.redirect('/user_login')
    }
  } catch (err) {
    return res.redirect('/user_login')
  }
};

module.exports = loginAuth;
