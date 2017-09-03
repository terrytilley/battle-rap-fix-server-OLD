import { GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';
import PostType from '../types/post';

export const post = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (root, { id }, { models }) => (
    models.Post.findOne({
      where: { id },
    })
  ),
};

export const posts = {
  type: new GraphQLList(PostType),
  resolve: (root, args, { models }) => models.Post.findAll({ where: args }),
};
