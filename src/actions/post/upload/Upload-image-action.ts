'use server';

import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

const uploadMaxSize =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  //TODO CHECK USER AUTHENTICATION

  //TODO Remove delay
  // await asyncdelay(5000, true);
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Nenhum arquivo enviado' });
  }
  if (file.size > uploadMaxSize) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}-${imageExtension}`;
  const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads';
  const uploadFullPath = resolve(process.cwd(), 'public', uploadDir);

  await mkdir(uploadFullPath, { recursive: true });

  //JS <- bytes -> Node -> Save in disk
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);
  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);
  const imageServerUrl =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';
  const url = `${imageServerUrl}/${uniqueImageName}`;
  console.log('Image uploaded to:', url);

  return makeResult({ url });
}
