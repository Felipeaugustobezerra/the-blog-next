import Link from 'next/link';
import Image from 'next/image';

type PostCoverImageProps = {
  href: string;
  src: string;
  alt: string;
  title?: string;
};

export function PostCoverImage({ href, src, alt, title }: PostCoverImageProps) {
  return (
    <Link className='w-full h-full overflow-hidden rounded-xl' href={href}>
      <Image
        title={title}
        className='group-hover:scale-105 transition w-full h-full object-cover object-position-center'
        src={src}
        width={500}
        height={500}
        alt={alt}
        priority
      />
    </Link>
  );
}
