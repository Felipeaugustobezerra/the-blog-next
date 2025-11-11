import { postRepository } from '@/repositories/post';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostCached } from '@/lib/post/queries';

export async function PostsList() {
  const posts = await findAllPublicPostCached();

  return (
    <div className='grid grid-cols-1 mb-16 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div key={post.id} className='flex flex-col gap-4 group'>
            <PostCoverImage
              href={postLink}
              src={post.coverImageUrl}
              alt={post.title}
              title={post.title}
            />
            <PostSummary
              postHeading='h2'
              postLink={postLink}
              createdAt={post.createdAt}
              title={post.title}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
