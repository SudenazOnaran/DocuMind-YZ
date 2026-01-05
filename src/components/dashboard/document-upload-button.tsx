'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileUp, Plus } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { summarizeUploadedDocument } from "@/ai/flows/summarize-uploaded-document";
import { createDocument } from "@/app/actions/create-document";
import { useRouter } from "next/navigation";



export function DocumentUploadButton() {
  const { open } = useSidebar();
  const router = useRouter();

  const [fileText, setFileText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // TXT dosyasını okur
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".txt")) {
      alert("Şimdilik sadece TXT dosyası desteklenmektedir.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFileText(reader.result as string);
    };
    reader.readAsText(file);
  };

  const handleProcess = async () => {
    if (!fileText || !title) {
      alert("Başlık ve dosya zorunlu");
      return;
    }

    setLoading(true);

    await createDocument({
      title,
      content: fileText,
    });

    setLoading(false);
    setOpenDialog(false); // ✅ dialog kapanır
    setFileText("");
    setTitle("");
    router.refresh(); // ✅ sidebar güncellenir
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className={cn("w-full justify-center", !open && "md:w-auto")}
          onClick={() => setOpenDialog(true)}
        >
          <Plus className={cn("mr-2 h-4 w-4", !open && "md:mr-0")} />
          <span className={cn(open ? "block" : "md:hidden")}>
            Doküman Yükle
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Belge Yükle</DialogTitle>
          <DialogDescription>
            Belgenizi sisteme yükleyin. AI destekli özellikler için işleme alınacaktır.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-accent/50 hover:bg-accent/80"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="w-10 h-10 mb-3 text-primary" />
                <p className="text-sm text-muted-foreground">
                  TXT dosyası yükleyin
                </p>
              </div>
              <Input
                id="file-upload"
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Başlık
            </Label>
            <Input
              id="title"
              placeholder="Belge Başlığı"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleProcess} disabled={loading}>
            {loading ? "İşleniyor..." : "Yükle ve İşle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}