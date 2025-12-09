'use client';
import { deletePostAction } from '@/actions/post/delete-post-action';

import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import Dialog from '../../../..';

type DeletePostButtonProps = {
  id: string;
  title: string;
};
export default function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleDelete() {
    setShowDialog(true);
  }
  function handleConfirm() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      alert(`O resultado da deleção é: ${result}`);
      setShowDialog(false);
    });
  }
  return (
    <>
      <button
        className={clsx(
          'text-red-500 cursor-pointer',
          '[&_svg]:w-4 [&_svg]:h-4',
          'hover:scale-120 hover:text-red-700',
          'transition-transform',
          'disabled:text-slate-600 cursor-not-allowed',
        )}
        aria-label={`Delete Post: ${title}`}
        title={`Delete Post: ${title}`}
        onClick={handleDelete}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Apagar Post ?'
          content={`Tem certeza que deseja apagar o post: ${title}`}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
