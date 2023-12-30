import Navbar from "@/components/Header/Navbar";

export default function Layout({ children }) {
  return (
    // TODO: Create Authentication
    <div className="bg-white min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
