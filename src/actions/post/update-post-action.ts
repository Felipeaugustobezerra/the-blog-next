'use server';

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPostDto,
} from '@/dto/post/dto';
import { PostUpdateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-message';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { v4 as uuidV4 } from 'uuid';

type UpdatePostActionState = {
  formState: PublicPostDto;
  errors: string[];
  success?: true;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  //TODO: verificar se o usuario esta logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Invalid form data'],
    };
  }
  const id = formData.get('id')?.toString() || '';
  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID invalido para update de post'],
    };
  }
  const formDataToObj = Object.fromEntries(formData.entries()); //[key, value][]
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return { errors, formState: makePartialPublicPost(formDataToObj) };
  }

  const validatedData = zodParsedObj.data;
  const newPost = {
    ...validatedData,
  };
  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Erro desconhecido ao criar post'],
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: true,
  };
}
