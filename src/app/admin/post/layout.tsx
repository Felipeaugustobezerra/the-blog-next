import { MenuAdmin } from '@/components/Admin/MenuAdmin';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default function AdminPostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
