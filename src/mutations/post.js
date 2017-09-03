import { GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import PostType from '../types/post';

export const createPost = {
  type: PostType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, args, { models }) => models.Post.create(args),
};

export const editPost = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  resolve: (root, { id, title, content }, { models }) =>
    models.Post.update({ title, content }, { where: { id } }),
};

export const deletePost = {
  type: new GraphQLNonNull(GraphQLInt),
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (root, args, { models }) =>
    models.Post.destroy({ where: args }),
};
