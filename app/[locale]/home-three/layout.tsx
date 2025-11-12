
import Footer from "../components/shared/Footer";
import NavbarThree from "../components/shared/NavbarThree";

export default function HomeThreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavbarThree />
      {children}
      <Footer />
    </div>
  );
}
