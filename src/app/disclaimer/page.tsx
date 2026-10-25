import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { legalBySlug } from "@/content/legal";

const doc = legalBySlug("disclaimer");
export const metadata = legalMetadata(doc);

export default function Page() {
  return <LegalPage doc={doc} />;
}
