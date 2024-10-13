"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import {
  Cat,
  Layers2,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";

import { auth } from "@/lib/firebase";

export default function Sidebar() {
  const menuList = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <Layers2 className="h-5 w-5" />,
    },
    {
      name: "Brands",
      link: "/admin/brands",
      icon: <Cat className="h-5 w-5" />,
    },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Customers",
      link: "/admin/customers",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Reviews",
      link: "/admin/reviews",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "Collections",
      link: "/admin/collections",
      icon: <LibraryBig className="h-5 w-5" />,
    },
    {
      name: "Admins",
      link: "/admin/admins",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  return (
    <section className="sticky top-0 flex flex-col gap-6 bg-white border-r px-5 py-2 h-screen overflow-hidden w-[260px] z-50">
      <div className="flex justify-center py-4">
        <Link href={`/`}>
          <img className="h-8" src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-2">
        {menuList?.map((item, key) => {
          return <Tab item={item} key={key} />;
        })}
      </ul>
      <div className="flex items-center justify-start text-red-600 font-semibold">
        <button
          onClick={async () => {
            try {
              await toast.promise(signOut(auth), {
                error: (e) => e?.message,
                loading: "Loading...",
                success: "Successfully Logged out",
              });
            } catch (error) {
              toast.error(error?.message);
            }
          }}
          className="flex gap-2 px-5 py-2 mb-4 border border-gray-200 hover:bg-indigo-100 rounded-xl w-full ease-soft-spring duration-400 transition-all items-center"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </section>
  );
}

function Tab({ item }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.link;
  return (
    <Link href={item?.link}>
      <li
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
        ${isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"}
        `}
      >
        {item?.icon} {item?.name}
      </li>
    </Link>
  );
}
