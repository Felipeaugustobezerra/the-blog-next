import { findPublicPostBySlugCached } from '@/lib/post/queries/public';
import Image from 'next/image';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkdown } from '../SafeMarkdown';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug);

  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl mb-6'
          src={post.coverImageUrl}
          width={500}
          height={500}
          alt={post.title}
        ></Image>

        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>

        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
        <p className='mb-6 text-xl'>{post.excerpt}</p>
        <SafeMarkdown markdown={post.content} />
      </header>
    </article>
  );
}
