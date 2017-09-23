import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ where: { id } })
    .then(user => done(null, user));
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, 'Invalid Credentials'); }
    return user.comparePassword(password, (error, isMatch) => {
      if (error) { return done(error); }
      if (isMatch) { return done(null, user); }
      return done(null, false, 'Invalid credentials.');
    });
  });
}));

function signup({ email, password, req }) {
  if (!email || !password) { throw new Error('You must provide an email and password.'); }

  return User
    .findOrCreate({ where: { email } })
    .spread((user, created) => {
      if (!created) { throw new Error('Email in use.'); }
      return user.get({ plain: true });
    })
    .then(user => (
      new Promise((resolve, reject) => {
        req.login(user, (err) => {
          if (err) { reject(err); }
          resolve(user);
        });
      })
    ));
}

function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject('Invalid credentials.'); }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

export default { signup, login };
