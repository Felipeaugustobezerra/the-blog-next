'use server';
import { logColor } from '@/utils/log-color';
// import { asyncdelay } from '@/utils/async-delay';
import { postRepository } from '@/repositories/post';
import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  // await asyncdelay(5000, true); // Simula uma operação demorada
  logColor('' + id);

  if (!id || typeof id !== 'string') {
    return { error: 'Invalid ID' };
  }

  const post = await postRepository.findById(id).catch(() => undefined);
  if (!post) {
    return { error: 'Post not found' };
  }

  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return { error: '' };
}
