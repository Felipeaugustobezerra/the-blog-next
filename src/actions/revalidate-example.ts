'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateTagAction(formData: FormData) {
  const path = formData.get('path') || '';
  console.log('Revalidating path:', path);

  revalidateTag('posts');
}
