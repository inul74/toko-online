"use client";

import AuthContextProvider from "@/contexts/AuthContext";

export default function AuthLayout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
