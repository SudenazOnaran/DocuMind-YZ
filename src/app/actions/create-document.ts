"use server";

import { prisma } from "@/lib/prisma";
import { summarizeUploadedDocument } from "@/ai/flows/summarize-uploaded-document";

export async function createDocument({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  // 1️⃣ Document oluştur
  const document = await prisma.document.create({
    data: {
      title,
      content,
    },
  });

  // 2️⃣ AI ile özet oluştur
  const aiResult = await summarizeUploadedDocument({
    documentContent: content,
  });

  // 3️⃣ Summary kaydet
  await prisma.summary.create({
    data: {
      text: aiResult.shortSummary,
      documentId: document.id,
    },
  });

  return document.id;
}
