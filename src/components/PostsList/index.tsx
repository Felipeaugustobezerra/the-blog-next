import { postRepository } from '@/repositories/post';
import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';

export async function PostsList() {
  const posts = await postRepository.findAll();

  return (
    <div className='grid grid-cols-1  gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => {
        const postLink = `/posts/${post.slug}`;
        return (
          <div key={post.id} className='flex flex-col gap-4 group'>
            <PostCoverImage
              href={postLink}
              src={post.coverImageUrl}
              alt={post.title}
              title={post.title}
            />
            <div className='flex flex-col justify-center'>
              <time
                className='text-slate-600 block text-sm/tight '
                dateTime={post.createdAt}
              >
                20/04/2025 10:00
              </time>

              <PostHeading as='h2' url={postLink}>
                {post.title}
              </PostHeading>
              <p>{post.excerpt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
