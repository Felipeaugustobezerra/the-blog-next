import Link from 'next/link';

export function Footer() {
  return (
    <footer className='text-l text-center py-8!'>
      &copy; {new Date().getFullYear()}
      <span>
        <Link className='font-bold ' href='/'>
          Apple magazine
        </Link>
        - All rights reserved.
      </span>
    </footer>
  );
}
