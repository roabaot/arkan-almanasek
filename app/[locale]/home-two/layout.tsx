
import NavbarTwo from "../components/shared/NavbarTwo";
import FooterTwo from "../components/shared/FooterTwo";

export default function HomeTwoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavbarTwo />
      {children}
      <FooterTwo />
    </div>
  );
}
