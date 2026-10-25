"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Loader2, LockKeyhole } from "lucide-react";
import { api } from "@/lib/admin-api";
import type { User } from "@/lib/admin-types";
import { Field, Input, btnCls } from "./ui";

export function LoginForm({ onLogin }: { onLogin: (u: User) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      onLogin(await api<User>("/auth/login", { method: "POST", body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }) }));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="panel-grid grid min-h-screen place-items-center bg-ink-900 px-5 py-16">
      <div className="w-full max-w-[400px]">
        <Image src="/brand/docwin-logo-white.png" alt="DocWin Digital" width={943} height={265} priority className="mx-auto h-10 w-auto" />
        <form onSubmit={submit} className="mt-10 space-y-5 rounded-2xl bg-white p-7 shadow-2xl sm:p-8" data-testid="admin-login-form">
          <div>
            <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700"><LockKeyhole className="size-5" aria-hidden /></span>
            <h1 className="mt-4 text-[1.45rem] font-medium tracking-[-0.015em] text-ink-900">Sign in to the content admin</h1>
            <p className="mt-1 text-[14px] text-ink-500">Manage blog posts, authors, resources and CTAs.</p>
          </div>
          <Field label="Email"><Input name="email" type="email" autoComplete="username" required data-testid="admin-login-email" /></Field>
          <Field label="Password"><Input name="password" type="password" autoComplete="current-password" required data-testid="admin-login-password" /></Field>
          {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2.5 text-[13.5px] font-medium text-rose-700" data-testid="admin-login-error">{error}</p>}
          <button type="submit" disabled={busy} className={btnCls("brand", "md", "h-11 w-full")} data-testid="admin-login-submit">
            {busy && <Loader2 className="animate-spin" aria-hidden />}{busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
