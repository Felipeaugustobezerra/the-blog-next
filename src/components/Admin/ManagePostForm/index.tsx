'use client';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useState } from 'react';
import { ImageUploader } from '../ImageUploader';

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState('');
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText labelText='Nome' placeholder='Digite seu nome' />
        <InputText labelText='Sobrenome' placeholder='Digite seu sobrenome' />
        <ImageUploader />
        <MarkdownEditor
          labelText='Conteudo'
          disabled={false}
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
        />

        <InputCheckbox labelText='Aceito os termos' />
      </div>
    </form>
  );
}
