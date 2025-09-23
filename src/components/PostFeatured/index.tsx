import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';

export function PostFeatured() {
  const slug = 'qualquer-slug';
  const postLink = `/posts/${slug}`;
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        href={postLink}
        src='/images/bryen_0.png'
        alt='Capa Post'
        title='Capa Post'
      />
      <div className='flex flex-col justify-center'>
        <time
          className='text-slate-600 block text-sm/tight '
          dateTime='2025-04-20'
        >
          20/04/2025 10:00
        </time>
        <PostHeading as='h1' url={postLink}>
          voluptates voluptas itaque assumenda aut possimus
        </PostHeading>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
          delectus nobis non,
        </p>
      </div>
    </section>
  );
}
