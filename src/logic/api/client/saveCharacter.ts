import { character } from '@prisma/client';

import {
  CREATE_CHARACTER_ROUTE,
  createApiCharacterSheetRoute,
} from '~/constants/routing/api';
import { NEW_CHARACTER_ID } from '~/constants/routing/client';
import { ApiResponse } from '~/typings/api';
import { CharacterSaveData } from '~/typings/characters';

export const saveCharacter = async (
  data: CharacterSaveData
): Promise<ApiResponse<character>> => {
  const { name, characterCode, playerId, id } = data;
  const isCreateCharacter = id === NEW_CHARACTER_ID;

  const resp = await fetch(
    // technically, query.id could be many strings or undefined
    // but routing logic prevents it from being anything other than a single string
    isCreateCharacter
      ? CREATE_CHARACTER_ROUTE
      : createApiCharacterSheetRoute(id),
    {
      method: isCreateCharacter ? 'POST' : 'PATCH',
      body: JSON.stringify({
        id,
        name,
        characterCode,
        playerId,
      }),
    }
  );

  const respData: ApiResponse<character> = await resp.json();

  return respData;
};
