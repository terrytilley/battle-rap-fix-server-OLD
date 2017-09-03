import { GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import UserType from '../types/user';

export const createUser = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { email, username }, { models }) =>
    models.User.create({ email: email.toLowerCase(), username }),
};

export const editUser = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
  },
  resolve: (root, { id, email, username }, { models }) =>
    models.User.update({ email, username }, { where: { id } }),
};

export const deleteUser = {
  type: new GraphQLNonNull(GraphQLInt),
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (root, args, { models }) =>
    models.User.destroy({ where: args }),
};
