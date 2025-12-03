import { findAllPostAdmin } from '@/lib/post/queries/admin';

export default async function PostsListAdmin() {
  const posts = await findAllPostAdmin();
  return (
    <div className='py-16 text-center'>
      {posts.map(post => {
        return (
          <p key={post.id}>
            <h2>{post.title}</h2>
          </p>
        );
      })}
    </div>
  );
}
