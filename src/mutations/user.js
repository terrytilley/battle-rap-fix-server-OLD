import { GraphQLString, GraphQLNonNull } from 'graphql';
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
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
  },
  resolve: (root, { id, email, username }, { models }) => {
    models.User.update({ email, username }, { where: { id } });
  },
};

export const deleteUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, args, { models }) => {
    models.User.destroy({ where: args });
  },
};
