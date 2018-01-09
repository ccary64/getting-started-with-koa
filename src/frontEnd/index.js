const Router = require('koa-router');
const fs = require('fs');

class FrontEnd {
  constructor(app) {
    this.app = app;
  }

  routes() {
    this.app.use(this.authRoutes.routes());
  }

  get authRoutes() {
    const authRouter = new Router();
    authRouter.get('/auth/register', async (ctx) => {
      ctx.type = 'html';
      ctx.body = fs.createReadStream('./src/server/views/register.html');
    });

    authRouter.get('/auth/logout', async (ctx) => {
      if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.redirect('/auth/login');
      } else {
        ctx.body = { success: false };
        ctx.throw(401);
      }
    });
    
    authRouter.get('/auth/status', async (ctx) => {
      if (ctx.isAuthenticated()) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./src/server/views/status.html');
      } else {
        ctx.redirect('/auth/login');
      }
    });
    
    return authRouter;
  }
}

module.exports = FrontEnd;