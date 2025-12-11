import ErrorMessage from '../ErrorMessage';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostCached } from '@/lib/post/queries/public';

export async function PostFeatured() {
  const posts = await findAllPublicPostCached();
  if (posts.length <= 0) {
    return (
      <ErrorMessage
        contentTitle='Ops...'
        content='Ainda não há posts publicados.'
      />
    );
  }
  const post = posts[0];

  const postLink = `/post/${post.slug}`;
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        href={postLink}
        src={post.coverImageUrl}
        alt='Capa Post'
        title={post.title}
      />
      <PostSummary
        postHeading='h1'
        postLink={postLink}
        createdAt={post.createdAt}
        title={post.title}
        excerpt={post.excerpt}
      />
    </section>
  );
}
