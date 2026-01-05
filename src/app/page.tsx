
'use client';

import { useState } from 'react';
import { mockDocuments } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentView } from "@/components/document/document-view";
import { BrainCircuit, FileText, UserCircle } from "lucide-react";
import { DocumentUploadButton } from "@/components/dashboard/document-upload-button";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from '@/lib/utils';
import type { Document } from '@/lib/types';


function DocumentList({ onSelectDocument, selectedDocument }: { onSelectDocument: (doc: Document) => void, selectedDocument: Document | null }) {
  return (
    <nav className="flex-1 space-y-2">
      {mockDocuments.map((doc) => (
        <button
          key={doc.id}
          onClick={() => onSelectDocument(doc)}
          className={cn(
            "w-full text-left",
            selectedDocument?.id === doc.id ? "" : ""
          )}
        >
          <Card className={cn(
            "hover:bg-accent/80 transition-colors",
            selectedDocument?.id === doc.id ? "bg-accent" : ""
          )}>
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex flex-col overflow-hidden">
                  <p className="font-semibold text-sm truncate" title={doc.title}>{doc.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Yüklenme: {new Date(doc.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </button>
      ))}
    </nav>
  );
}

function HomePageContent() {
  const { open: sidebarOpen } = useSidebar();
  const [selectedDocument, setSelectedDocument] = useState<Document>(mockDocuments[0]);

  return (
    <div className="flex h-screen w-full bg-muted/40">
      {/* Left Sidebar */}
      <aside className={cn("hidden w-80 flex-col border-r bg-background p-4 md:flex transition-all duration-300", !sidebarOpen && "md:w-20 md:p-2")}>
        <div className={cn("flex items-center gap-2 pb-4 border-b", !sidebarOpen && "justify-center")}>
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className={cn("text-xl font-bold font-headline", !sidebarOpen && "md:hidden")}>DocuMind</h1>
        </div>
        <div className="py-4">
          <DocumentUploadButton />
        </div>
        <DocumentList onSelectDocument={setSelectedDocument} selectedDocument={selectedDocument} />
        <div className="mt-auto flex items-center justify-center p-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                N
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold md:hidden">DocuMind</h1>
            {selectedDocument && <h1 className="text-xl font-semibold hidden md:block" title={selectedDocument.title}>{selectedDocument.title}</h1>}
          </div>
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              <UserCircle />
            </AvatarFallback>
          </Avatar>
        </header>
        <main className="flex-1 overflow-y-auto">
          {selectedDocument ? (
             <DocumentView document={selectedDocument} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Görüntülemek için bir belge seçin.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
    return (
        <SidebarProvider>
            <HomePageContent />
        </SidebarProvider>
    )
}
