import { HamburgerMenu } from '@/components/HamburgerMenu/HamburgerMenu';
export const dynamic = 'force-dynamic';

export default function AccountLayout({ children }) {
  return (
    <>
      <HamburgerMenu />
      {children}
    </>
  );
}
