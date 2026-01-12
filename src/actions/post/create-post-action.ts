'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { makePartialPublicPost, PublicPostDto } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-message';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { v4 as uuidV4 } from 'uuid';

type CreatePostActionState = {
  formState: PublicPostDto;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  //TODO: verificar se o usuario esta logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Invalid form data'],
    };
  }
  const formDataToObj = Object.fromEntries(formData.entries()); //[key, value][]

  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);
  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return { errors, formState: makePartialPublicPost(formDataToObj) };
  }

  const validatedData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validatedData,
    id: uuidV4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: makeSlugFromText(validatedData.title),
    // gerar slug simples aleatorio
  };

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }
    return {
      formState: newPost,
      errors: ['Erro desconhecido ao criar post'],
    };
  }

  revalidateTag('posts');
  redirect(`/admin/post/${newPost.id}`);
}
