import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = { labelText?: string } & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className='flex flex-col mb-2 gap-2'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'bg-white outline-0 text-base/tight',
          'ring-2 ring-slate-400 rounded',
          'p-2 transition focus:ring-blue-500',
          'placeholder:text-slate-400',
          'disabled:bg-slate-200 disabled:cursor-not-allowed',
          'disabled:text-slate-500',
          'disabled:placeholder-slate-500',
          'read-only:bg-slate-200',
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
