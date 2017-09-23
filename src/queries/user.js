import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import models from '../models';
import UserType from '../types/user';

export const user = {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { username }) => (
    models.User.findOne({
      where: { username },
    })
  ),
};

export const users = {
  type: new GraphQLList(UserType),
  resolve: (root, args) => models.User.findAll({ where: args }),
};
