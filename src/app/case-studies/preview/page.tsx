import { CaseStudyTemplate } from "@/components/templates/CaseStudyTemplate";
import { caseStudyPreview } from "@/content/case-studies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Case Study Template Preview | DocWin Digital", description: "Internal preview of the case study template.", path: "/case-studies/preview/", noindex: true });

export default function CaseStudyPreviewPage() {
  return <CaseStudyTemplate cs={caseStudyPreview} />;
}
