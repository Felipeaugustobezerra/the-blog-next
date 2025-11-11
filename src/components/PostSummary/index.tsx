import { formatDateTime, formatRelativeDate } from '@/utils/format-datetime';
import { PostHeading } from '../PostHeading';

type PostSummaryProps = {
  postHeading: 'h1' | 'h2';
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
};

export async function PostSummary({
  postHeading,
  postLink,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <div className='flex flex-col justify-center'>
      <time
        className='text-slate-600 block text-sm/tight '
        dateTime={createdAt}
        title={formatRelativeDate(createdAt)}
      >
        {formatDateTime(createdAt)}
      </time>

      <PostHeading as='h2' url={postLink}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
