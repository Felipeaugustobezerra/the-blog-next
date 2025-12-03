export const dynamic = 'force-dynamic';

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};
export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  return (
    <div className='py-16 text-center'>
      <h1 className='text-2xl font-bold'>Admin Login</h1>
    </div>
  );
}
