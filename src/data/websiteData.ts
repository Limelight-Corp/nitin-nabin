import translationsData from "./json/translations.json";
import navData from "./json/nav.json";
import milestonesData from "./json/milestones.json";
import updatesData from "./json/updates.json";
import pressData from "./json/press.json";
import speechesData from "./json/speeches.json";
import valsEnData from "./json/vals_en.json";
import valsHiData from "./json/vals_hi.json";

export type Language = "en" | "hi";

export interface BilingualText {
  en: string;
  hi: string;
}

export interface NavItem {
  id: string;
  num: string;
  en: string;
  hi: string;
}

export interface Milestone {
  year: string;
  filter: "Elections" | "Governance" | "Organisation" | "National Role";
  category: BilingualText;
  short: BilingualText;
  title: BilingualText;
  location: BilingualText;
  body: BilingualText;
  record: BilingualText;
}

export interface UpdateItem {
  category: BilingualText;
  date: string;
  location: BilingualText;
  title: BilingualText;
  summary: BilingualText;
  cat?: string;
  featured?: boolean;
}

export interface PressItem {
  outlet: string;
  date: string;
  title: string;
  href?: string;
}

export interface SpeechItem {
  category: BilingualText;
  date: string;
  place: BilingualText;
  title: BilingualText;
  summary: BilingualText;
}

export interface KeyFact {
  k: string;
  v: string;
}

export interface FieldItem {
  i: number;
  pos: {
    left: string;
    top: string;
    width: string;
    rot: string;
    bg: string;
    fg: string;
  };
  title1: string;
  title2?: string;
  kicker: string;
  body: string;
  stat: string;
  statLabel: string;
  aria?: string;
}

export interface OfficeRecord {
  period: string;
  title: string;
  body: string;
  cat?: string;
}

export interface LeadSection {
  kicker: string;
  title: string;
  overview: string;
  items: {
    when: string;
    what: string;
  }[];
}

export interface BioSection {
  id: string;
  anchor: string;
  num: string;
  title: string;
  body: string;
}

export interface WorkItem {
  sector?: string;
  category?: string;
  role?: string;
  period?: string;
  headline?: string;
  detail?: string;
  title?: string;
  description?: string;
  metrics?: {
    val: string;
    lbl: string;
  }[];
  [key: string]: any;
}

export interface AlbumItem {
  title: string;
  count: string;
  slotId?: string;
  mediaSlotId?: string;
  placeholder?: string;
  image?: string;
}

export interface ArcStep {
  step: string;
  title: string;
  years: string;
  body: string;
  cta: string;
  aria?: string;
  target?: string;
}

export interface ValsData {
  keyFacts: KeyFact[];
  fields: FieldItem[];
  offices: OfficeRecord[];
  bioSections: BioSection[];
  leadSections: LeadSection[];
  workItems: WorkItem[];
  albums: AlbumItem[];
  arc: ArcStep[];
  updatesHome: any[];
  updatesRest: any[];
  speechesHome: any[];
  speechList: any[];
  press: any[];
}

export const TRANSLATIONS: Record<string, BilingualText> = translationsData as Record<string, BilingualText>;
export const NAV_ITEMS: NavItem[] = navData as NavItem[];
export const MILESTONES: Milestone[] = milestonesData as Milestone[];
export const UPDATES: UpdateItem[] = updatesData as UpdateItem[];
export const PRESS: PressItem[] = pressData as PressItem[];
export const SPEECHES: SpeechItem[] = speechesData as SpeechItem[];
export const VALS_EN: ValsData = valsEnData as unknown as ValsData;
export const VALS_HI: ValsData = valsHiData as unknown as ValsData;
