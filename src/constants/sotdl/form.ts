import { SotdlCharacterData } from '~/typings/sotdl/characterData';

// START - Form - START

// Per https://react-hook-form.com/api/useform
// it is encouraged to have default values for all fields
// I have them for most that aren't add-another-multiple fields
export const DEFAULT_VALUES: SotdlCharacterData = {
  name: '',
  level: 0,
  ancestry: '',
  novice_path: '',
  expert_path: '',
  master_path: '',
  pathBenefits: '',
  ancestryBenefits: '',
  professions: '',
  languages: '',
  attribute_strength: 10,
  attribute_will: 10,
  attribute_agility: 10,
  attribute_intellect: 10,
  perception: 10,
  perception_bonus: 0,
  damage: 0,
  health: 1,
  healing_rate: 1,
  insanity: 0,
  corruption: 0,
  defense: 10,
  speed: 10,
  size: 1,
  fateRolls: 0,
  spell_power: 0,
  fortune: false,
  active_armor_index: 0,
  active_weapon_index: 0,
  currency_gold: 0,
  currency_silver: 0,
  currency_copper: 0,
  background: '',
  appearance: '',
  generalNotes: '',
};
// END - Form - END
