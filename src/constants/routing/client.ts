import { SupportedRulebooks } from '~/typings/rulebooks';

export const HOME_ROUTE = '/';
export const SETTINGS_ROUTE = '/settings';

// START - CHARACTER SHEET - START
export const CHARACTERS_ROUTE = '/characters';
export const createCharacterSheetRoute = (
  id: number | string,
  rulebook: SupportedRulebooks
) => `${CHARACTERS_ROUTE}/${rulebook}/${id}`;

export const NEW_CHARACTER_ID = 'new';
export const NEW_CHARACTER_ROUTE = `${CHARACTERS_ROUTE}/${NEW_CHARACTER_ID}`;
// END - CHARACTER SHEET - END

// START - SOTDL - START
export const createSotdlCharacterSheetRoute = (id: string | number) =>
  createCharacterSheetRoute(id, 'sotdl');
// END - SOTDL - END

// START - SWN - START
export const createSwnCharacterSheetRoute = (id: string | number) =>
  createCharacterSheetRoute(id, 'swn');
// END - SWN - END

// START - PROFILE - START
export const createProfileRoute = (id: number | string) => `/profiles/${id}`;
// END - PROFILE - END
