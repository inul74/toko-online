"use client";

import { signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, CircularProgress } from "@nextui-org/react";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const { user } = useAuth();

  const { data: admin, error, isLoading } = useAdmin({ email: user?.email });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    toggleSidebar();
  }, [pathname]);

  useEffect(() => {
    function handleClickOutsideEvent(event) {
      if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-red-500">{error}</h1>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
        <h1 className="font-bold">You are not admin!</h1>
        <h1 className="text-gray-600 text-sm">{user?.email}</h1>
        <Button
          onClick={async () => {
            await signOut(auth);
          }}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <main className="relative flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div
        ref={sidebarRef}
        className={`
          fixed md:hidden ease-in-out transition-all duration-400 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}
        `}
      >
        <Sidebar />
      </div>
      <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <section className="pt-14 flex-1 bg-[#eff3f4]">{children}</section>
      </section>
    </main>
  );
}
