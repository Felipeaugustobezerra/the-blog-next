import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children,
  url,
  as: Tag = 'h2',
}: PostHeadingProps) {
  return (
    <Tag className='text-2xl/tight  font-bold mb-4 '>
      <Link className='hover:text-slate-600' href={url}>
        {children}
      </Link>
    </Tag>
  );
}
