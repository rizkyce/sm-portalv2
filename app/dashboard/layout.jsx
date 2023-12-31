"use client";

import Navbar from "@/components/Header/Navbar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading)
    return <div className="text-center text-3xl mt-20">Loading...</div>;

  return isAuthenticated ? (
    // TODO: Create Authentication
    <div className="bg-white min-h-screen">
      <Navbar />
      {children}
    </div>
  ) : (
    router.push("/")
  );
}
