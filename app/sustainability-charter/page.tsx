import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Sustainability Charter" };

export default function Page() {
  return <LegalPage slug="sustainability-charter" />;
}
