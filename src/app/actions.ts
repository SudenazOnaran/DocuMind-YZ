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
  const parsed = summarySchema.safeParse({
    documentId: formData.get("documentId"),
    documentContent: formData.get("documentContent"),
  });

  if (!parsed.success) {
    return { message: "Geçersiz veri.", summary: null };
  }

  try {
    const aiResult = await summarizeUploadedDocument({
      documentContent: parsed.data.documentContent,
    });

    // 1️⃣ Summary var mı kontrol et
    const existingSummary = await prisma.summary.findUnique({
      where: { documentId: parsed.data.documentId },
    });

    let summary;

    if (existingSummary) {
      // 2️⃣ VARSA → UPDATE
      summary = await prisma.summary.update({
        where: { documentId: parsed.data.documentId },
        data: {
          text: aiResult.shortSummary,
        },
      });
    } else {
      // 3️⃣ YOKSA → CREATE
      summary = await prisma.summary.create({
        data: {
          text: aiResult.shortSummary,
          documentId: parsed.data.documentId,
        },
      });
    }

    return {
      message: "Özet başarıyla oluşturuldu.",
      summary,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Özet oluşturulurken hata oluştu.",
      summary: null,
    };
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