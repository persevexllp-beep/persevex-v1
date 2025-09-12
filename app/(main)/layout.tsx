import Navbar from "../components/Appbar"; 
import { ScrollProvider } from "../contexts/scrollContext"; 

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollProvider>
      <Navbar />
      {children}
    </ScrollProvider>
  );
}