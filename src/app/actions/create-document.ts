"use server";

import { prisma } from "@/lib/prisma";

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

  
  // 2️⃣ MUTLAKA vector-service'e ekle
  await fetch("http://127.0.0.1:8001/add-document", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      document_id: document.id,
      content,
    }),
  });

  return document.id;
}
