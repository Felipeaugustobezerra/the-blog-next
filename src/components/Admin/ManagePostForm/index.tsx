'use client';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { makePartialPublicPost, PublicPostDto } from '@/dto/post/dto';
import { createPostAction } from '@/actions/post/create-post-action';
import { Button } from '@/components/Button';
import { toast } from 'react-toastify';

type ManagePostFormProps = {
  publicPost: PublicPostDto;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );
  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach(error => {
        toast.error(error);
      });
    }
  }, [state.errors]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || '');

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='Generating Ids automatically'
          type='text'
          defaultValue={formState?.id}
          readOnly
        />
        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Generating slugs automatically'
          type='text'
          defaultValue={formState?.slug}
          readOnly
        />
        <InputText
          labelText='Author'
          name='author'
          placeholder="Author's Name"
          type='text'
          defaultValue={formState?.author}
        />
        <InputText
          labelText='Title'
          name='title'
          placeholder='Post Title'
          type='text'
          defaultValue={formState?.title}
        />
        <InputText
          labelText='Excerpt'
          name='excerpt'
          placeholder='Post Excerpt'
          type='text'
          defaultValue={formState?.excerpt}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          disabled={false}
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
        />
        <ImageUploader />
        <InputText
          labelText='Cover Image URL'
          name='coverImageUrl'
          placeholder='Post Cover Image URL'
          type='text'
          defaultValue={formState?.coverImageUrl}
        />

        <InputCheckbox
          labelText='Published ?'
          name='published'
          type='checkbox'
          defaultChecked={formState?.published}
        />
        <div className='mt-4'>
          <Button type='submit'>Post</Button>
        </div>
      </div>
    </form>
  );
}
