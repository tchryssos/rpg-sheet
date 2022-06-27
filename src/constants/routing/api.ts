import {
  CHARACTERS_ROUTE,
  createProfileRoute,
  NEW_CHARACTER_ROUTE,
} from './client';

export const CREATE_CHARACTER_ROUTE = `/api${NEW_CHARACTER_ROUTE}/create`;

export const createApiCharacterSheetRoute = (id: string | number) =>
  `/api${CHARACTERS_ROUTE}/${id}`;

export const createProfileApiRoute = (id: number | string) =>
  `/api/${createProfileRoute(id)}`;

export const createProfileCharactersApiRoute = (id: number | string) =>
  `${createProfileApiRoute(id)}/characters`;
