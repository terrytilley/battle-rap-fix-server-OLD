import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import UserType from '../types/user';

const usersData = [
  { id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35 },
  { id: '2', name: 'Steve Smith', email: 'steve@gmail.com', age: 25 },
  { id: '3', name: 'Sara Williams', email: 'sara@gmail.com', age: 32 },
];

export const user = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
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
