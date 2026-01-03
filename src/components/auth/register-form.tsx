"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // No actual registration, just redirect
    router.push("/");
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">İsim</Label>
        <Input id="name" type="text" placeholder="Adınız Soyadınız" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-register">E-posta</Label>
        <Input id="email-register" type="email" placeholder="ornek@alanadi.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-register">Şifre</Label>
        <Input id="password-register" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        <UserPlus className="mr-2 h-4 w-4" />
        Kayıt Ol
      </Button>
    </form>
  );
}
