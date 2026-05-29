export const SECTION_IDS = ["about", "services", "gallery", "team", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const VALID_SECTIONS = new Set<string>(SECTION_IDS);
