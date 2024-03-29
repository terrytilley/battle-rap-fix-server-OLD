import {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';
import PostType from './post';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: user => user.id,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    username: {
      type: GraphQLString,
      resolve: user => user.username,
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: user => user.getPosts(),
    },
    createdAt: {
      type: GraphQLString,
      resolve: user => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: user => user.updatedAt,
    },
  }),
});
