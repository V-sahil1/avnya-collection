import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Trade" };

export default function Page() {
  return <LegalPage slug="terms-of-trade" />;
}
