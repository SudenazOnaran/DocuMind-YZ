'use client';

import { useState } from "react";
import type { Document } from "@/lib/types";

import { cn } from "@/lib/utils";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { DocumentUploadButton } from "@/components/dashboard/document-upload-button";
import { DocumentView } from "@/components/document/document-view";

import {
  BrainCircuit,
  FileText,
  UserCircle,
} from "lucide-react";

/* ---------------- Document List ---------------- */

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
    <nav className="flex-1 space-y-2">
      {documents.map((doc) => (
        <button
          key={doc.id}
          onClick={() => onSelectDocument(doc)}
          className="w-full text-left"
        >
          <Card
            className={cn(
              "hover:bg-accent/80 transition-colors",
              selectedDocument?.id === doc.id && "bg-accent"
            )}
          >
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex flex-col overflow-hidden">
                  <p className="font-semibold text-sm truncate">
                    {doc.title}
                  </p>
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

/* ---------------- Home Page Content ---------------- */

export default function HomePageContent({
  documents,
}: {
  documents: Document[];
}) {
  const { open: sidebarOpen } = useSidebar();

  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(documents[0] ?? null);

  return (
    <div className="flex h-screen w-full bg-muted/40">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden w-80 flex-col border-r bg-background p-4 md:flex transition-all",
          !sidebarOpen && "md:w-20 md:p-2"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 pb-4 border-b",
            !sidebarOpen && "justify-center"
          )}
        >
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1
            className={cn(
              "text-xl font-bold",
              !sidebarOpen && "md:hidden"
            )}
          >
            DocuMind
          </h1>
        </div>

        <div className="py-4">
          <DocumentUploadButton />
        </div>

        <DocumentList
          documents={documents}
          selectedDocument={selectedDocument}
          onSelectDocument={setSelectedDocument}
        />

        <div className="mt-auto flex items-center justify-center p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            U
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            {selectedDocument && (
              <h1 className="text-xl font-semibold hidden md:block truncate">
                {selectedDocument.title}
              </h1>
            )}
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
              Belge seçin
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
