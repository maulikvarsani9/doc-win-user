import type { ServicePage } from "../types";
import { searchAndAdsPages } from "./search-ads";
import { webAndContentPages } from "./web-content";
import { brandStrategyTechPages } from "./brand-strategy-tech";

export const servicePages: Record<string, ServicePage> = { ...searchAndAdsPages, ...webAndContentPages, ...brandStrategyTechPages };
