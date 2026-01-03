"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthCard() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <Tabs defaultValue="login" className="w-full">
        <CardHeader className="text-center">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
            </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
