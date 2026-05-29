import SiteLanding from "@/components/SiteLanding";
import { SectionId, VALID_SECTIONS } from "@/lib/constants";
import { notFound } from "next/navigation";

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;

  if (!VALID_SECTIONS.has(section)) {
    notFound();
  }

  return <SiteLanding section={section as SectionId} />;
}
