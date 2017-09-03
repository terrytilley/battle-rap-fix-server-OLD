import { GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import UserType from '../types/user';

export const createUser = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, args, { models }) => models.User.create(args),
};

export const editUser = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    newUsername: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { username, newUsername }, { models }) =>
    models.User.update({ username: newUsername }, { where: { username } }),
};

export const deleteUser = {
  type: new GraphQLNonNull(GraphQLInt),
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, args, { models }) =>
    models.User.destroy({ where: args }),
};
