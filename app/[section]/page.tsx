import SiteLanding from "@/components/SiteLanding";
import { notFound } from "next/navigation";

const validSections = new Set(["about", "services", "gallery", "team", "contact"]);

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;

  if (!validSections.has(section)) {
    notFound();
  }

  return <SiteLanding section={section as "about" | "services" | "gallery" | "team" | "contact"} />;
}