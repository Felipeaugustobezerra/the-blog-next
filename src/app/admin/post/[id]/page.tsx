import { ManagePostForm } from '@/components/Admin/ManagePostForm';
import { makePublicPostFromDb } from '@/dto/post/dto';
import { findPostByIdAdmin } from '../../../../lib/post/queries/admin';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Edit Post',
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};
export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id);
  const publicPost = makePublicPostFromDb(post);
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-bold'>Edit Post</h1>
      <ManagePostForm publicPost={publicPost} />
    </div>
  );
}
