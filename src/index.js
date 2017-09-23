import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from './schema';
import models from './models';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
}));

app.use('/graphql', graphqlExpress({ schema, context: { models } }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

models.User
  .findOrCreate({ where: { email: 'test@test.com' } })
  .spread((user, created) => {
    if (!created) { throw new Error('Email in use.'); }
    // console.log('USER:', user.get({ plain: true }));
    // console.log('CREATED:', created);

    return user.get({ plain: true });
  })
  .then(user => console.log(user));

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
