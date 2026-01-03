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


export function DocumentUploadButton() {
  const { open } = useSidebar();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("w-full justify-center", !open && "md:w-auto")}>
          <Plus className={cn("mr-2 h-4 w-4", !open && "md:mr-0")} />
          <span className={cn(open ? "block" : "md:hidden")}>Doküman Yükle</span>
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
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-accent/50 hover:bg-accent/80">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-10 h-10 mb-3 text-primary" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Yüklemek için tıklayın</span> veya sürükleyip bırakın</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, TXT (MAX. 5MB)</p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Başlık
            </Label>
            <Input id="title" placeholder="Belge Başlığı" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Yükle ve İşle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
