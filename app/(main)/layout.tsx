import Header from "@/modules/Header";
import Footer from "@/modules/Footer";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
