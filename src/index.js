import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import expressGraphQL from 'express-graphql';
import schema from './schema';
import './services/auth';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
}));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {},
  });
});

app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
