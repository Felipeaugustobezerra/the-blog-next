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
import { updatePostAction } from '@/actions/post/update-post-action';
import { useRouter, useSearchParams } from 'next/navigation';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPostDto;
};
type ManagePostFormCreateProps = {
  mode: 'create';
};
type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;
  if (mode === 'update') {
    publicPost = props.publicPost;
  }
  const actionsMap = {
    create: createPostAction,
    update: updatePostAction,
  };
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );
  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach(error => {
        toast.error(error);
      });
    }
  }, [state.errors]);
  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post updated successfully!');
    }
  }, [state.success]);
  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Post created successfully!');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [created, router]);

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
          disabled={isPending}
          readOnly
        />
        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Generating slugs automatically'
          type='text'
          defaultValue={formState?.slug}
          disabled={isPending}
          readOnly
        />
        <InputText
          labelText='Author'
          name='author'
          placeholder="Author's Name"
          type='text'
          defaultValue={formState?.author}
          disabled={isPending}
        />
        <InputText
          labelText='Title'
          name='title'
          placeholder='Post Title'
          type='text'
          defaultValue={formState?.title}
          disabled={isPending}
        />
        <InputText
          labelText='Excerpt'
          name='excerpt'
          placeholder='Post Excerpt'
          type='text'
          defaultValue={formState?.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
          disabled={isPending}
        />
        <ImageUploader disabled={isPending} />
        <InputText
          labelText='Cover Image URL'
          name='coverImageUrl'
          placeholder='Post Cover Image URL'
          type='text'
          defaultValue={formState?.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          labelText='Published ?'
          name='published'
          type='checkbox'
          defaultChecked={formState?.published}
          disabled={isPending}
        />
        <div className='mt-4'>
          <Button disabled={isPending} type='submit'>
            Post
          </Button>
        </div>
      </div>
    </form>
  );
}
