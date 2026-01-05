"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentView } from "@/components/document/document-view";
import { BrainCircuit, FileText, UserCircle } from "lucide-react";
import { DocumentUploadButton } from "@/components/dashboard/document-upload-button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { Document } from "@/lib/types";

function DocumentList({
  documents,
  onSelectDocument,
  selectedDocument,
}: {
  documents: Document[];
  onSelectDocument: (doc: Document) => void;
  selectedDocument: Document | null;
}) {
  return (
    <nav className="flex-1 space-y-2">
      {documents.map((doc) => (
        <button key={doc.id} onClick={() => onSelectDocument(doc)}>
          <Card
            className={cn(
              "hover:bg-accent/80",
              selectedDocument?.id === doc.id && "bg-accent"
            )}
          >
            <CardContent className="p-3">
              <div className="flex gap-3">
                <FileText className="h-5 w-5 mt-1" />
                <div>
                  <p className="font-semibold text-sm">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(doc.createdAt).toLocaleDateString("tr-TR")}
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

export default function DashboardLayout({
  documents,
  selectedDocument,
  setSelectedDocument,
}: {
  documents: Document[];
  selectedDocument: Document | null;
  setSelectedDocument: (doc: Document) => void;
}) {
  const { open } = useSidebar();

  return (
    <div className="flex h-screen">
      <aside className={cn("w-80 p-4 border-r", !open && "w-20")}>
        <DocumentUploadButton />
        <DocumentList
          documents={documents}
          selectedDocument={selectedDocument}
          onSelectDocument={setSelectedDocument}
        />
      </aside>

      <main className="flex-1">
        {selectedDocument && <DocumentView document={selectedDocument} />}
      </main>
    </div>
  );
}
