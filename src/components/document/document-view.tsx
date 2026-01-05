"use client";

import { useState, useTransition, useEffect, useActionState } from "react";
import type { Document, QaPair } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Lightbulb, Loader, MessageSquare, Quote, Search, Sparkles, Wand } from "lucide-react";
import { getSummary, getAnswer } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const initialSummaryState = {
  message: "",
  summary: null,
};

const initialAnswerState = {
    message: "",
    qaPair: null
}

export function DocumentView({ document }: { document: Document }) {
  const [summaryState, summaryFormAction, isSummaryPending] = useActionState(getSummary, initialSummaryState);
  
  const [answerState, answerFormAction, isAnswerPending] = useActionState(getAnswer, initialAnswerState);

  const { toast } = useToast();

  const [qaHistory, setQaHistory] = useState<QaPair[]>([]);
  
  useEffect(() => {
    if (summaryState.message && summaryState.message !== "Özet başarıyla oluşturuldu.") {
        toast({
            variant: "destructive",
            title: "Hata",
            description: summaryState.message,
        });
    }
  }, [summaryState, toast]);

  useEffect(() => {
    if (answerState.message && answerState.message !== "Cevap başarıyla oluşturuldu.") {
        toast({
            variant: "destructive",
            title: "Hata",
            description: answerState.message,
        });
    }
    if (answerState.qaPair) {
        setQaHistory(prev => [answerState.qaPair as QaPair, ...prev]);
    }
  }, [answerState, toast]);

  return (
    <div className="p-4 md:p-6 space-y-6">
        <header>
            <h2 className="text-2xl font-bold">{document.title}</h2>
            <p className="text-sm text-muted-foreground">
                Yüklenme Tarihi: {new Date(document.createdAt).toLocaleDateString("tr-TR")}
            </p>
        </header>

        <Tabs defaultValue="summary">
            <TabsList>
                <TabsTrigger value="summary"><Wand className="mr-2 h-4 w-4"/>Özet</TabsTrigger>
                <TabsTrigger value="qa"><MessageSquare className="mr-2 h-4 w-4"/>Soru-Cevap</TabsTrigger>
                <TabsTrigger value="search"><Search className="mr-2 h-4 w-4"/>Arama</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="mt-4">
                <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="flex items-center gap-2">Belge Özeti</CardTitle>
                            <CardDescription>
                            Dokümanın AI tarafından oluşturulmuş özeti.
                            </CardDescription>
                        </div>
                        <form action={summaryFormAction}>
                            <input type="hidden" name="documentContent" value={document.content} />
                            <Button type="submit" disabled={isSummaryPending} variant="outline">
                                {isSummaryPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                {isSummaryPending ? "Yenileniyor..." : "Özeti Yenile"}
                            </Button>
                        </form>
                    </div>
                </CardHeader>
                <CardContent>
                    {summaryState.summary ? (
                    <div className="prose prose-sm max-w-none rounded-md border p-4 bg-muted/50">
                        <p>{summaryState.summary}</p>
                    </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>Henüz bir özet oluşturulmadı.</p>
                            <p className="text-xs">Özet oluşturmak için "Özeti Yenile" düğmesini kullanın.</p>
                        </div>
                    )}
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="qa" className="mt-4">
                 <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MessageSquare /> AI'a Sor</CardTitle>
                            <CardDescription>Belge hakkında doğal dilde bir soru sorun.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={answerFormAction}>
                                <input type="hidden" name="documentContent" value={document.content} />
                                <div className="grid w-full gap-2">
                                    <Textarea name="question" placeholder="Örn: Bu projenin ana hedefi nedir?" required/>
                                    <Button type="submit" disabled={isAnswerPending}>
                                        {isAnswerPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                        {isAnswerPending ? "Soruluyor..." : "Cevap Al"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Cevap Geçmişi</CardTitle>
                            <CardDescription>Önceki sorularınız ve AI cevapları.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {qaHistory.length === 0 ? (
                                <div className="text-center text-muted-foreground py-8">
                                    <p>Henüz bir soru sormadınız.</p>
                                </div>
                            ) : (
                                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                                    {qaHistory.map((qa, index) => (
                                        <div key={index}>
                                            <div className="font-semibold mb-2">{qa.question}</div>
                                            <div className="prose prose-sm max-w-none text-foreground mb-4">{qa.answer}</div>
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1"><Quote className="h-3 w-3" /> KAYNAKLAR</h4>
                                                {qa.sources.map((source, i) => (
                                                    <blockquote key={i} className="border-l-2 pl-3 text-xs text-muted-foreground italic">
                                                        {source}
                                                    </blockquote>
                                                ))}
                                            </div>
                                            {index < qaHistory.length - 1 && <Separator className="my-6" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                 </div>
            </TabsContent>
            <TabsContent value="search" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Arama</CardTitle>
                        <CardDescription>Belge içeriğinde arama yapın.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Arama özelliği yakında burada olacak.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
