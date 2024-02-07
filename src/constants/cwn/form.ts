import { CwnCharacterData } from '~/typings/cwn/characterData';

export const CWN_SKILL_UNTRAINED = -1;

export const DEFAULT_VALUES: CwnCharacterData = {
  type: 'cwn',
  name: '',
  level: 1,
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
  contacts: [],
  skill_administer: CWN_SKILL_UNTRAINED,
  skill_connect: CWN_SKILL_UNTRAINED,
  skill_drive: CWN_SKILL_UNTRAINED,
  skill_exert: CWN_SKILL_UNTRAINED,
  skill_fix: CWN_SKILL_UNTRAINED,
  skill_heal: CWN_SKILL_UNTRAINED,
  skill_know: CWN_SKILL_UNTRAINED,
  skill_lead: CWN_SKILL_UNTRAINED,
  skill_notice: CWN_SKILL_UNTRAINED,
  skill_perform: CWN_SKILL_UNTRAINED,
  skill_program: CWN_SKILL_UNTRAINED,
  skill_punch: CWN_SKILL_UNTRAINED,
  skill_shoot: CWN_SKILL_UNTRAINED,
  skill_sneak: CWN_SKILL_UNTRAINED,
  skill_survive: CWN_SKILL_UNTRAINED,
  skill_stab: CWN_SKILL_UNTRAINED,
  skill_talk: CWN_SKILL_UNTRAINED,
  skill_trade: CWN_SKILL_UNTRAINED,
  skill_work: CWN_SKILL_UNTRAINED,
  remaining_skill_points: 0,
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
