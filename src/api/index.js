const Router = require('koa-router');
const passport = require('koa-passport');

const Auth = require('./auth');
const Controllers = require('./controllers');
const authController = Controllers.auth;
const movieController = Controllers.movies;

class Api {
  constructor(app) {
    this.app = app;
    Auth.passportInit();
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(this.indexRoutes.routes());
    this.app.use(this.movieRoutes.routes());
    this.app.use(this.authRoutes.routes());
  }

  get indexRoutes() {
    const indexRouter = new Router();
    indexRouter.get('/', async (ctx) => {
      ctx.body = {
        status: 'success',
        message: 'hello, world!'
      };
    })
    return indexRouter;
  }

  get movieRoutes() {
    const movieRouter = new Router();
    const BASE_URL = `/api/v1/movies`;
    movieRouter.get(BASE_URL, movieController.getAll);
    return movieRouter;
  }

  get authRoutes() {
    const authRouter = new Router();
    authRouter.post('/auth/register', authController.registerUser);
    authRouter.post('/auth/login', authController.authenticateUser);
    return authRouter;
  }
}

module.exports = Api;