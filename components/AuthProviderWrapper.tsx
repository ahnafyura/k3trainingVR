"use client";

import { AuthProvider } from "@/components/AuthProvider";

export default function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
