import { WwnCharacterData } from '~/typings/wwn/characterData';

export const WWN_SKILL_UNTRAINED = -1;

export const DEFAULT_VALUES: WwnCharacterData = {
  type: 'wwn',
  name: '',
  level: 1,
  ancestry: '',
  goal: '',
  description: '',
  attribute_strength: 10,
  attribute_dexterity: 10,
  attribute_constitution: 10,
  attribute_intelligence: 10,
  attribute_wisdom: 10,
  attribute_charisma: 10,
  background_name: '',
  background_details: '',
  class_name: '',
  class_abilities: [],
  skill_administer: WWN_SKILL_UNTRAINED,
  skill_connect: WWN_SKILL_UNTRAINED,
  skill_convince: WWN_SKILL_UNTRAINED,
  skill_craft: WWN_SKILL_UNTRAINED,
  skill_exert: WWN_SKILL_UNTRAINED,
  skill_heal: WWN_SKILL_UNTRAINED,
  skill_know: WWN_SKILL_UNTRAINED,
  skill_lead: WWN_SKILL_UNTRAINED,
  skill_magic: WWN_SKILL_UNTRAINED,
  skill_notice: WWN_SKILL_UNTRAINED,
  skill_perform: WWN_SKILL_UNTRAINED,
  skill_pray: WWN_SKILL_UNTRAINED,
  skill_punch: WWN_SKILL_UNTRAINED,
  skill_ride: WWN_SKILL_UNTRAINED,
  skill_sail: WWN_SKILL_UNTRAINED,
  skill_shoot: WWN_SKILL_UNTRAINED,
  skill_sneak: WWN_SKILL_UNTRAINED,
  skill_survive: WWN_SKILL_UNTRAINED,
  skill_stab: WWN_SKILL_UNTRAINED,
  skill_trade: WWN_SKILL_UNTRAINED,
  skill_work: WWN_SKILL_UNTRAINED,
  remaining_skill_points: WWN_SKILL_UNTRAINED,
  foci: [],
  magic_efforts: [],
  magic_traditions: [],
  magic_spell_slots: [],
  health_max: 1,
  health_current: 1,
  system_strain: 0,
  attack_bonus_base: 0,
  attack_bonus_melee: 0,
  attack_bonus_ranged: 0,
  initiative_bonus: 0,
  equipment: [],
  weapons: [],
  armors: [],
  currency_copper: 0,
  currency_silver: 0,
  currency_gold: 0,
};
