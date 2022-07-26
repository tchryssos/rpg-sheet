import { character } from '@prisma/client';
import { ErrorResponse } from './api';

export type CharacterSaveData = Pick<
  character,
  'characterCode' | 'name' | 'playerId'
> & {
  id: number | 'new';
};

export type StrictCharacter = Omit<character> & {
  characterData: Record<string, string>;
};
