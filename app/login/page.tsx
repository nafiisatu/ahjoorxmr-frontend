"use client";

import Link from "next/link";
import { Wallet, ArrowRight } from "lucide-react";
import { useWallet, AVAILABLE_WALLETS } from "@/contexts/WalletContext";

export default function LoginPage() {
  const { connect, signInWithPasskey } = useWallet();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Welcome Back</h1>
          <p className="text-[var(--muted)]">Sign in to continue to your circles</p>
        </div>

        <div className="space-y-4">
          {AVAILABLE_WALLETS.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => connect(wallet.id)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--hover)] transition-colors"
            >
              <span className="font-medium text-[var(--text)]">{wallet.name}</span>
              <Wallet className="h-5 w-5 text-[var(--muted)]" />
            </button>
          ))}

          <button
            onClick={signInWithPasskey}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--hover)] transition-colors"
          >
            <span className="font-medium text-[var(--text)]">Sign in with Passkey</span>
            <ArrowRight className="h-5 w-5 text-[var(--muted)]" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <p className="text-center text-sm text-[var(--muted)] mb-3">
            Using email/password?
          </p>
          <Link
            href="/forgot-password"
            className="block text-center text-sm text-[var(--primary)] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}