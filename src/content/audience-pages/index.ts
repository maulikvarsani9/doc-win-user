import type { AudiencePage } from "../types";
import { medicalDentalPages } from "./medical-dental";
import { clinicsCarePages } from "./clinics-care";
import { techB2bPages } from "./tech-b2b";
import { specializedPages } from "./specialized";

export const audiencePages: Record<string, AudiencePage> = { ...medicalDentalPages, ...clinicsCarePages, ...techB2bPages, ...specializedPages };
