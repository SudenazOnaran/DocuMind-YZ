"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

export function LoginForm() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // No actual authentication, just redirect
    router.push("/");
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input id="email" type="email" placeholder="ornek@alanadi.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Şifre</Label>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        <LogIn className="mr-2 h-4 w-4" />
        Giriş Yap
      </Button>
    </form>
  );
}
