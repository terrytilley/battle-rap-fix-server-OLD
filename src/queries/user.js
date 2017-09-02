import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import UserType from '../types/user';

export const user = {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { username }, { models }) => (
    models.User.findOne({
      where: { username },
    })
  ),
};

export const users = {
  type: new GraphQLList(UserType),
  resolve: (root, args, { models }) => models.User.findAll(),
};
