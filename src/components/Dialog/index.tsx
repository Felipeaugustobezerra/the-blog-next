'use client';
import clsx from 'clsx';
import React from 'react';
import { Button } from '../Button';

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
          <Button
            variant='ghost'
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button variant='default' onClick={onConfirm} disabled={disabled}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
