"use client";

import dynamic from "next/dynamic";
import { createContext, useContext, useMemo, useState } from "react";

export type DialogKind = "contact" | "audit" | "sample";

const LeadDialog = dynamic(() => import("./LeadDialog").then((m) => m.LeadDialog), { ssr: false });

const LeadDialogContext = createContext<{ open: (kind: DialogKind) => void }>({ open: () => {} });

export const useLeadDialog = () => useContext(LeadDialogContext);

export function LeadDialogProvider({ children }: { children: React.ReactNode }) {
  const [kind, setKind] = useState<DialogKind | null>(null);
  const [loaded, setLoaded] = useState(false);
  const value = useMemo(() => ({ open: (k: DialogKind) => { setLoaded(true); setKind(k); } }), []);
  return (
    <LeadDialogContext.Provider value={value}>
      {children}
      {loaded && <LeadDialog kind={kind} onKindChange={setKind} />}
    </LeadDialogContext.Provider>
  );
}
