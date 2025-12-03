import { postRepository } from '@/repositories/post';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPostCached = unstable_cache(
  cache(async () => {
    return await postRepository.findAllPublic();
  }),
  ['posts'],
  {
    tags: ['posts'],
    revalidate: 60,
  },
);

export const findPostBySlugCached = (slug: string) =>
  unstable_cache(
    cache(async (slug: string) => {
      const post = await postRepository
        .findBySlugPublic(slug)
        .catch(() => undefined);

      if (!post) {
        notFound();
      }

      return post;
    }),
    ['posts'],
    {
      tags: [`post-${slug}`],
      revalidate: 60,
    },
  )(slug);

export const findPostByIdCached = cache(
  async (id: string) => await postRepository.findById(id),
);
