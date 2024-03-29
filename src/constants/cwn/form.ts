import { TabLabelObject } from '~/components/tabs/types';
import { CwnCharacterData } from '~/typings/cwn/characterData';

import { RpgIcons } from '../icons';

export const CWN_SKILL_UNTRAINED = -1;
const CWN_DEFAULT_ATTRIBUTE_SCORE = 10;
export const CWN_DEFAULT_SAVE_SCORE = 15;

export const DEFAULT_VALUES: CwnCharacterData = {
  type: 'cwn',
  name: '',
  level: 1,
  description: '',
  goal: '',
  languages: '',
  ties: '',
  attribute_strength: CWN_DEFAULT_ATTRIBUTE_SCORE,
  attribute_dexterity: CWN_DEFAULT_ATTRIBUTE_SCORE,
  attribute_constitution: CWN_DEFAULT_ATTRIBUTE_SCORE,
  attribute_intelligence: CWN_DEFAULT_ATTRIBUTE_SCORE,
  attribute_wisdom: CWN_DEFAULT_ATTRIBUTE_SCORE,
  attribute_charisma: CWN_DEFAULT_ATTRIBUTE_SCORE,
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
  edges: [],
  health_max: 1,
  health_current: 1,
  system_strain_current: 0,
  system_strain_max: CWN_DEFAULT_ATTRIBUTE_SCORE,
  traumatic_hit: false,
  trauma_target: 6,
  major_injuries: [],
  other_statuses: [],
  save_evasion: CWN_DEFAULT_SAVE_SCORE,
  save_luck: CWN_DEFAULT_SAVE_SCORE,
  save_mental: CWN_DEFAULT_SAVE_SCORE,
  save_physical: CWN_DEFAULT_SAVE_SCORE,
  armor_class_melee: 10,
  armor_class_ranged: 10,
  armors: [],
  weapons: [],
  cyberware: [],
  cyberdecks: [],
  program_subjects: [],
  program_verbs: [],
  attack_bonus: 0,
  inventory: [],
  currency: 0,
  damage_soak_max: 0,
  damage_soak_current: 0,
};

export const CWN_TAB_LABELS = [
  {
    label: 'Description',
    icon: RpgIcons.Scroll,
  },
  {
    label: 'Stats',
    icon: RpgIcons.Dice,
  },
  {
    label: 'Status',
    icon: RpgIcons.SmileGuy,
  },
  {
    label: 'Abilities',
    icon: RpgIcons.Ripple,
  },
  {
    label: 'Combat',
    icon: RpgIcons.StackedSkulls,
  },
  {
    label: 'Equipment',
    icon: RpgIcons.Chest,
  },
  {
    label: 'Hacking',
    icon: RpgIcons.DoorOpen,
  },
] as const satisfies TabLabelObject[];
export type TabLabel = (typeof CWN_TAB_LABELS)[number]['label'];
