import { SotwwCharacterData } from '~/typings/sotww/characterData';

export const DEFAULT_VALUES: SotwwCharacterData = {
  type: 'sotww',
  name: '',
  level: 1,
  ancestry: '',
  ancestry_traits: '',
  description: '',
  professions: '',
  languages: '',
  attribute_agility: 10,
  attribute_intellect: 10,
  attribute_strength: 10,
  attribute_will: 10,
  path_novice: '',
  path_novice_benefits: [],
  path_expert: '',
  path_expert_benefits: [],
  path_master: '',
  path_master_benefits: [],
  health_current: 1,
  health_max: 1,
  damage: 0,
  defense: 10,
  size: 1,
  speed: 5,
};
