import { prisma } from "@/lib/prisma";
import HomePageContent from "./home-page-content";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Page() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
    include: { summary: true },
  });

  return (
    <SidebarProvider>
      <HomePageContent documents={documents} />
    </SidebarProvider>
  );
}
