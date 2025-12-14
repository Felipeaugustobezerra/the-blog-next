'use client';
import clsx from 'clsx';
import {
  CircleIcon,
  FileText,
  HouseIcon,
  MenuIcon,
  Plus,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-lg ',
    'flex flex-col mb-8',
    'sm:flex-row sm:flex-wrap sm:gap-4 sm:mb-12 ',
    !isOpen && 'h-10 overflow-hidden',
    'sm:overflow-visible sm:h-auto',
  );
  const linkClasses = clsx(
    '[&>svg]:w-4 [&>svg]:h-4 px-4',
    'flex items-center justify-start gap-2 cursor-pointer',
    'hover:bg-slate-800 transition rounded-lg',
    'h-10',
    'shrink-0',
  );
  const openCloseBtn = clsx(linkClasses, 'text-blue-200 italic', 'sm:hidden ');

  return (
    <nav className={navClasses}>
      <button onClick={() => setIsOpen(s => !s)} className={openCloseBtn}>
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleIcon />
            Fechar
          </>
        )}
      </button>
      <a className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>
      <Link className={linkClasses} href='/admin/post'>
        <FileText />
        Posts
      </Link>
      <Link className={linkClasses} href='/admin/post/new'>
        <PlusIcon />
        Criar Post
      </Link>
    </nav>
  );
}
