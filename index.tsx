'use client';
import clsx from 'clsx';
import React from 'react';

type DialogProps = {
  isVisible?: boolean;
  title?: string;
  content: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  disabled: boolean;
};

export default function Dialog({
  isVisible = false,
  title,
  content,
  onCancel,
  onConfirm,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;
    onCancel?.();
  }

  return (
    <div
      className={clsx(
        'fixed z-50 inset-0 bg-black/50 backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'flex flex-col gap-6',
          'p-6 mx-6 rounded-lg max-w-2xl bg-slate-100',
          'shadow-lg shadow-black/30 text-center',
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className={clsx('text-xl font-bold')}>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>
        <div className={clsx('flex  items-center justify-around')}>
          <button
            className={clsx(
              'bg-slate-300 hover:bg-slate-400 transition  text-slate-950',
              'flex items-center justify-center',
              'py-2 px-4 rounded-md cursor-pointer',
              'disabled:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-500',
            )}
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </button>
          <button
            className={clsx(
              'bg-blue-500 hover:bg-blue-600 transition  text-slate-100',
              'flex items-center justify-center',
              'py-2 px-4 rounded-md cursor-pointer',
              'disabled:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-500',
            )}
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
