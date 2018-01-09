const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const knex = require('./db/connection');

class Auth {
  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }

  passportInit() {
    const options = {};

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser( async (id, done) => {
      try {
        const user = await knex('users').where({id}).first();
        return done(null, user);
      } catch (err) {
        return done(err,null);
      }
    });

    passport.use(new LocalStrategy(options, async (username, password, done) => {
      try {
        const user = await knex('users').where({ username }).first();
        const passMatch = (this.comparePass(password, user.password));
        if (!user || !passMatch) {
          return done(null, false);
        }
    
        return done(null, user);
      } catch (err) { 
        return done(err); 
      }
    }));
  }
}

module.exports = new Auth();
