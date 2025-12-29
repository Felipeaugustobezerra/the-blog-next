'use client';
import { ImageUp } from 'lucide-react';
import { Button } from '../../Button/index';
import { useRef, useTransition } from 'react';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { toast } from 'react-toastify';
import { uploadImageAction } from '@/actions/post/upload/Upload-image-action';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }
  function handleChangeFile() {
    toast.dismiss();
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;
    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(
        `A imagem é muito grande. O tamanho máximo é ${readableMaxSize} KB.`,
      );
      fileInput.value = ''; // reset file input
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(`Erro ao fazer upload da imagem: ${result.error}`);
        fileInput.value = ''; // reset file input
        return;
      }
      toast.success(result.url);
    });

    fileInput.value = ''; // reset file input
  }
  return (
    <div className='flex flex-col gap-3 py-4'>
      <Button
        onClick={handleChooseFile}
        type='button'
        className='self-start'
        variant='default'
        size='md'
      >
        <ImageUp />
        Upload Image
      </Button>

      <input
        onChange={handleChangeFile}
        ref={fileInputRef}
        className='hidden'
        name='File'
        type='file'
        accept='image/*'
      />
    </div>
  );
}
