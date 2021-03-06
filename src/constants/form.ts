// START - Form - START
export const FIELD_NAMES = {
  name: 'name',
  level: 'level',
  ancestry: 'ancestry',
  paths: {
    novice_path: 'novice_path',
    expert_path: 'expert_path',
    master_path: 'master_path',
  },
  pathBenefits: 'path_benefits',
  ancestryBenefits: 'ancestry_benefits',
  professions: 'professions',
  languages: 'languages',
  attributes: {
    strength: 'strength',
    agility: 'agility',
    intellect: 'intellect',
    will: 'will',
  },
  defense: 'defense',
  damage: 'damage',
  health: 'health',
  healing_rate: 'healing_rate',
  speed: 'speed',
  perception: 'perception',
  perception_bonus: 'perception_bonus',
  insanity: 'insanity',
  corruption: 'corruption',
  size: 'size',
  reach: 'reach',
  space: 'space',
  fortune: 'fortune',
  fateRolls: 'fate_rolls',
  armors: {
    fieldName: 'armors',
    name: 'armor_name',
    defense: 'armor_defense',
    notes: 'armor_notes',
  },
  activeArmorIndex: 'active_armor_index',
  weapons: {
    fieldName: 'weapons',
    name: 'weapon_name',
    hands: 'weapon_hands',
    damage: 'weapon_damage',
    notes: 'weapon_notes',
  },
  activeWeaponIndex: 'active_weapon_index',
  currency: {
    gold: 'currency_gold',
    silver: 'currency_silver',
    copper: 'currency_copper',
  },
  equipment: {
    fieldName: 'equipment',
    name: 'equipment_name',
    value: 'equipment_value',
    notes: 'equipment_notes',
  },
  background: 'background',
  appearance: 'appearance',
  generalNotes: 'general_notes',
  spellPower: 'spell_power',
  spells: {
    fieldName: 'spells',
    name: 'spell_name',
    rank: 'spell_rank',
    type: 'spell_type',
    tradition: 'spell_tradition',
    description: 'spell_description',
    totalCastings: 'spell_total_castings',
    remainingCastings: 'spell_remaining_castings',
  },
} as const;

export type SotdlFields = typeof FIELD_NAMES;

// Per https://react-hook-form.com/api/useform
// it is encouraged to have default values for all fields
// I have them for most that aren't add-another-multiple fields
export const DEFAULT_VALUES = {
  [FIELD_NAMES.name]: '',
  [FIELD_NAMES.level]: 0,
  [FIELD_NAMES.ancestry]: '',
  [FIELD_NAMES.paths.novice_path]: '',
  [FIELD_NAMES.paths.expert_path]: '',
  [FIELD_NAMES.paths.master_path]: '',
  [FIELD_NAMES.pathBenefits]: '',
  [FIELD_NAMES.ancestryBenefits]: '',
  [FIELD_NAMES.professions]: '',
  [FIELD_NAMES.languages]: '',
  [FIELD_NAMES.attributes.strength]: 10,
  [FIELD_NAMES.attributes.will]: 10,
  [FIELD_NAMES.attributes.intellect]: 10,
  [FIELD_NAMES.attributes.agility]: 10,
  [FIELD_NAMES.perception]: 10,
  [FIELD_NAMES.perception_bonus]: 0,
  [FIELD_NAMES.damage]: 0,
  [FIELD_NAMES.health]: 1,
  [FIELD_NAMES.healing_rate]: 1,
  [FIELD_NAMES.insanity]: 0,
  [FIELD_NAMES.corruption]: 0,
  [FIELD_NAMES.defense]: 10,
  [FIELD_NAMES.speed]: 10,
  [FIELD_NAMES.size]: 1,
  [FIELD_NAMES.fateRolls]: 0,
  [FIELD_NAMES.spellPower]: 0,
  [FIELD_NAMES.fortune]: false,
  [FIELD_NAMES.activeArmorIndex]: 0,
  [FIELD_NAMES.activeWeaponIndex]: 0,
  [FIELD_NAMES.currency.gold]: 0,
  [FIELD_NAMES.currency.silver]: 0,
  [FIELD_NAMES.currency.copper]: 0,
  [FIELD_NAMES.background]: '',
  [FIELD_NAMES.appearance]: '',
  [FIELD_NAMES.generalNotes]: '',
};
// END - Form - END
