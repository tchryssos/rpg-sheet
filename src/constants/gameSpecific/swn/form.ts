export const FIELD_NAMES = {
  rulebook: 'rulebook',
  name: 'name',
  level: 'level',
} as const;

export type SwnFields = typeof FIELD_NAMES;
