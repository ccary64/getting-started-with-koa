'use strict';

const passport = require('koa-passport');

const Errors = require('../../lib/errors');

const UnauthorizedError = Errors.UnauthorizedError;
const NotFoundError = Errors.NotFoundError;
const LoginError = Errors.LoginError;


const authenticateUser = (ctx) => passport.authenticate('local', (err, user, info, status) => {
  if (user) {
    ctx.login(user);
    ctx.status = 200;
    ctx.body = { status: 'success' };
  } else {
    throw new UnauthorizedError('User not authenticated');
  }
})(ctx);

const registerUser = async (ctx) => {
  try {
    const user = await Users.addUser(ctx.request.body);
  } catch (err) {
    console.log(err.message);
    throw new LoginError();
  }

  return authenticateUser(ctx);
}

module.exports = { authenticateUser, registerUser };