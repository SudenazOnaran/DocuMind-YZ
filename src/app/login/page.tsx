import { AuthCard } from "@/components/auth/auth-card";
import { BrainCircuit } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2 text-primary">
          <BrainCircuit className="h-10 w-10" />
          <h1 className="text-3xl font-bold font-headline">DocuMind</h1>
        </div>
        <p className="text-muted-foreground text-center max-w-sm">
          Yapay Zekâ Destekli Anlamsal Doküman Arama ve Özetleme Sistemi
        </p>
        <AuthCard />
      </div>
    </main>
  );
}
