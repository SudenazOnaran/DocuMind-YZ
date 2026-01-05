"use server";

import { summarizeUploadedDocument } from "@/ai/flows/summarize-uploaded-document";
import { askQuestionAboutDocument } from "@/ai/flows/ask-question-about-document";
import { z } from "zod";

const summarySchema = z.object({
  documentContent: z.string(),
});

export async function getSummary(prevState: any, formData: FormData) {
  const validatedFields = summarySchema.safeParse({
    documentContent: formData.get("documentContent"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid input.",
      summary: null,
    };
  }

  try {
    const result = await summarizeUploadedDocument(validatedFields.data);
    return {
      message: "Özet başarıyla oluşturuldu.",
      summary: result.shortSummary,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Özet oluşturulurken bir hata oluştu.",
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