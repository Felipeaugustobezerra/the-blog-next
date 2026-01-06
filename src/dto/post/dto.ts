import { PostModel } from '@/models/post/post-model';

export type PublicPostDto = Omit<PostModel, 'updatedAt'>;

export const makePartialPublicPost = (
  post?: Partial<PostModel>,
): PublicPostDto => {
  return {
    id: post?.id || '',
    slug: post?.slug || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    author: post?.author || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    createdAt: post?.createdAt || '',
    published: post?.published || false,
  };
};
export const makePublicPostFromDb = (post: PostModel): PublicPostDto => {
  return makePartialPublicPost(post);
};
