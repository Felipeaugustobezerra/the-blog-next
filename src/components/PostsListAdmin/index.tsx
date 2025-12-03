import { findAllPostAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { Trash2Icon } from 'lucide-react';

export default async function PostsListAdmin() {
  const posts = await findAllPostAdmin();
  return (
    <div className='mb-16 '>
      {posts.map(post => {
        return (
          <div
            className={clsx(
              'py-2',
              'px - 2',
              !post.published && 'bg-slate-300',
              'flex gap-2 items-center justify-between',
            )}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
            {!post.published && (
              <span className='text-xs text-slate 600 italic'>
                (Not Published)
              </span>
            )}
            <button
              className={clsx(
                'text-red-500 cursor-pointer',
                '[&_svg]:w-4 [&_svg]:h-4',
                'hover:scale-120 hover:text-red-700',
                'transition-transform',
              )}
              aria-label={`Delete Post: ${post.title}`}
              title={`Delete Post: ${post.title}`}
            >
              <Trash2Icon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
