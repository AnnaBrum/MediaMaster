import { HamburgerMenu } from "@/components/HamburgerMenu/HamburgerMenu";

export default function AccountLayout({ children }) {
  return (
    <>
      <HamburgerMenu />
      {children}
    </>
  );
}
