import { PostFeatured } from '@/components/PostFeatured';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';

import { Suspense } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Welcome to the blog homepage',
};

export default async function HomePage() {
  return (
    <>
      <PostFeatured />
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </>
  );
}
