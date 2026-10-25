import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { legalBySlug } from "@/content/legal";

const doc = legalBySlug("cookie-policy");
export const metadata = legalMetadata(doc);

export default function Page() {
  return <LegalPage doc={doc} />;
}
