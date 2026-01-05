"use server";

import { summarizeUploadedDocument } from "@/ai/flows/summarize-uploaded-document";
import { askQuestionAboutDocument } from "@/ai/flows/ask-question-about-document";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const summarySchema = z.object({
  documentId: z.string(),
  documentContent: z.string(),
});

export async function getSummary(prevState: any, formData: FormData) {
  const documentId = formData.get("documentId") as string;

  try {
    const res = await fetch("http://127.0.0.1:8001/summarize-document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        document_id: documentId,
        summary_type: "short",
      }),
    });

    const data = await res.json();

    const summary = await prisma.summary.upsert({
      where: { documentId },
      update: { shortText: data.summary },
      create: {
        documentId,
        shortText: data.summary,
      },
    });

    return { message: "Özet başarıyla oluşturuldu.", summary };
  } catch {
    return { message: "Özet oluşturulamadı.", summary: null };
  }
}



const questionSchema = z.object({
  documentContent: z.string(),
  question: z.string(),
});

export async function getAnswer(prevState: any, formData: FormData) {
    const validatedFields = questionSchema.safeParse({
      documentContent: formData.get("documentContent"),
      question: formData.get("question"),
    });
  
    if (!validatedFields.success) {
      return {
        message: "Geçersiz giriş.",
        qaPair: null,
      };
    }
  
    try {
      const result = await askQuestionAboutDocument(validatedFields.data);
      return {
        message: "Cevap başarıyla oluşturuldu.",
        qaPair: {
          question: validatedFields.data.question,
          answer: result.answer,
          sources: result.sources,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Cevap oluşturulurken bir hata oluştu.",
        qaPair: null,
      };
    }
  }