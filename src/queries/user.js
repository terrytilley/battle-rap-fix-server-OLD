import { GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import UserType from '../types/user';

const usersData = [
  { id: 1, username: 'johnd', email: 'jdoe@gmail.com' },
  { id: 2, username: 'steves', email: 'steve@gmail.com' },
  { id: 3, username: 'saraw', email: 'sara@gmail.com' },
];

export const user = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (root, args) => {
    for (let i = 0; i < usersData.length; i += 1) {
      if (usersData[i].id === args.id) {
        return usersData[i];
      }
    }
  },
};

export const users = {
  type: new GraphQLList(UserType),
  resolve: () => (
    usersData
  ),
};
