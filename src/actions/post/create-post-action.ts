'use client';

import { makePartialPublicPost, PublicPostDto } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { getZodErrorMessages } from '@/utils/get-zod-error-message';

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
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: Math.random().toString(36).substring(2, 15), // gerar slug simples aleatorio
  };

  return {
    formState: newPost,
    errors: [],
  };
}
