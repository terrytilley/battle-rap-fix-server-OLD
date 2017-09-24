import { GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import models from '../models';
import UserType from '../types/user';
import AuthService from '../services/auth';

export const signup = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { email, username, password }, req) =>
    AuthService.signup({ email, username, password, req }),
};

export const login = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { email, password }, req) =>
    AuthService.login({ email, password, req }),
};

export const logout = {
  type: UserType,
  resolve: (root, args, req) => {
    const { user } = req;
    req.logout();
    return user;
  },
};

export const editUser = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
  },
  resolve: (root, { id, email, username }) =>
    models.User.update({ email, username }, { where: { id } }),
};

export const deleteUser = {
  type: new GraphQLNonNull(GraphQLInt),
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (root, args) =>
    models.User.destroy({ where: args }),
};
