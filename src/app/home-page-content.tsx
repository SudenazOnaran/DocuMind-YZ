"use client";

import { useState } from "react";
import type { Document } from "@/lib/types";
import { DocumentView } from "@/components/document/document-view";
import { DocumentUploadButton } from "@/components/dashboard/document-upload-button";
import { useSidebar } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

function DocumentList({
  documents,
  selectedDocument,
  onSelectDocument,
}: {
  documents: Document[];
  selectedDocument: Document | null;
  onSelectDocument: (doc: Document) => void;
}) {
  return (
    <nav className="space-y-2">
      {documents.map((doc) => (
        <button key={doc.id} onClick={() => onSelectDocument(doc)}>
          <Card
            className={cn(
              "hover:bg-accent/80",
              selectedDocument?.id === doc.id && "bg-accent"
            )}
          >
            <CardContent className="p-3 flex gap-3">
              <FileText className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="font-semibold text-sm truncate">{doc.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(doc.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </CardContent>
          </Card>
        </button>
      ))}
    </nav>
  );
}

export default function HomePageContent({
  documents,
}: {
  documents: Document[];
}) {
  const { open } = useSidebar();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    documents[0] ?? null
  );

  return (
    <div className="flex h-screen">
      <aside className={cn("border-r p-4", open ? "w-80" : "w-20")}>
        <DocumentUploadButton />
        <DocumentList
          documents={documents}
          selectedDocument={selectedDocument}
          onSelectDocument={setSelectedDocument}
        />
      </aside>

      <main className="flex-1">
        {selectedDocument ? (
          <DocumentView document={selectedDocument} />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Belge seçin
          </div>
        )}
      </main>
    </div>
  );
}
