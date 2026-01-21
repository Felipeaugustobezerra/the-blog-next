'use client';
import { ImageUp } from 'lucide-react';
import { Button } from '../../Button/index';
import { useRef, useState, useTransition } from 'react';

import { toast } from 'react-toastify';
import { uploadImageAction } from '@/actions/post/upload/Upload-image-action';

const uploadMaxSize =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;
type ImageUploaderProps = { disabled?: boolean };

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFile() {
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }
    fileInputRef.current.click();
  }
  function handleChangeFile() {
    toast.dismiss();
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }
    if (file.size > uploadMaxSize) {
      const readableMaxSize = (uploadMaxSize / 1024).toFixed(2);
      toast.error(
        `A imagem é muito grande. O tamanho máximo é ${readableMaxSize} KB.`,
      );
      fileInput.value = ''; // reset file input
      setImgUrl('');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(`Erro ao fazer upload da imagem: ${result.error}`);
        fileInput.value = ''; // reset file input
        setImgUrl('');
        return;
      }
      setImgUrl(result.url);
      toast.success('Image uploaded successfully!');
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
        disabled={isUploading || disabled}
      >
        <ImageUp />
        Upload Image
      </Button>

      {!!imgUrl && (
        <div className='flex flex-col gap-2 max-w-xl'>
          <p>
            <b>URL:</b> {imgUrl}
          </p>
          {/*  eslint-disable-next-line  */}
          <img src={imgUrl} />
        </div>
      )}
      <input
        onChange={handleChangeFile}
        ref={fileInputRef}
        className='hidden'
        name='File'
        type='file'
        accept='image/*'
        disabled={isUploading || disabled}
      />
    </div>
  );
}
