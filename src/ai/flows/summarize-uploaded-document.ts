'use server';

/**
 * @fileOverview A document summarization AI agent.
 *
 * - summarizeUploadedDocument - A function that handles the summarization process.
 * - SummarizeUploadedDocumentInput - The input type for the summarizeUploadedDocument function.
 * - SummarizeUploadedDocumentOutput - The return type for the summarizeUploadedDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedDocumentInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the document to be summarized.'),
});
export type SummarizeUploadedDocumentInput = z.infer<
  typeof SummarizeUploadedDocumentInputSchema
>;

const SummarizeUploadedDocumentOutputSchema = z.object({
  shortSummary: z
    .string()
    .describe('A concise summary of the document content.'),
});
export type SummarizeUploadedDocumentOutput = z.infer<
  typeof SummarizeUploadedDocumentOutputSchema
>;

export async function summarizeUploadedDocument(
  input: SummarizeUploadedDocumentInput
): Promise<SummarizeUploadedDocumentOutput> {
  return summarizeUploadedDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUploadedDocumentPrompt',
  input: {schema: SummarizeUploadedDocumentInputSchema},
  output: {schema: SummarizeUploadedDocumentOutputSchema},
  prompt: `You are an expert summarizer who can create a short summary of any document content.

  Summarize the following document content in a concise manner:

  {{{documentContent}}}`,
});

const summarizeUploadedDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedDocumentFlow',
    inputSchema: SummarizeUploadedDocumentInputSchema,
    outputSchema: SummarizeUploadedDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
