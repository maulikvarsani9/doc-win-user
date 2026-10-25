"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SWRConfig } from "swr";
import { Toaster } from "sonner";
import { api, fetcher, send } from "@/lib/admin-api";
import type { User } from "@/lib/admin-types";
import { LoginForm } from "./LoginForm";
import { Sidebar } from "./Sidebar";
import { Loading } from "./ui";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const path = usePathname() ?? "";
  useEffect(() => {
    api<User>("/auth/me").then(setUser).catch(() => setUser(null));
  }, []);
  const logout = async () => {
    await send("/auth/logout", "POST").catch(() => null);
    setUser(null);
  };
  if (user === undefined) return <Loading label="Checking your session…" />;
  if (!user) return <LoginForm onLogin={setUser} />;
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
      {path.startsWith("/admin/preview") ? children : (
        <div className="min-h-screen bg-ink-50 lg:flex" data-testid="admin-app">
          <Sidebar user={user} onLogout={logout} />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      )}
      <Toaster richColors position="top-right" closeButton />
    </SWRConfig>
  );
}
