import { GraphQLList } from 'graphql';
import models from '../models';
import UserType from '../types/user';

export const user = {
  type: UserType,
  resolve(root, args, req) {
    return req.user;
  },
};

export const users = {
  type: new GraphQLList(UserType),
  resolve: (root, args) => models.User.findAll({ where: args }),
};
