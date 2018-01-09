const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Api = require('./api');
const RedisStore = require('koa-redis');
const session = require('koa-session');

const app = new Koa();
const PORT = process.env.PORT || 3000;

// sessions
app.keys = ['your-session-secret']
app.use(session({}, app))

// body parser
app.use(bodyParser());

// Initialize api
const api = new Api(app);

// server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;