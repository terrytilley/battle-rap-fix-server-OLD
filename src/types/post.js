import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';
import UserType from './user';

export default new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: post => post.id,
    },
    title: {
      type: GraphQLString,
      resolve: post => post.title,
    },
    content: {
      type: GraphQLString,
      resolve: post => post.content,
    },
    author: {
      type: UserType,
      resolve: post => post.getUser(),
    },
    createdAt: {
      type: GraphQLString,
      resolve: post => post.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: post => post.updatedAt,
    },
  }),
});
