import { createContext } from 'react';

import { DropdownMenuProps } from '~/components/dropdowns/DropdownMenu';

type NavContext = {
  iconPortalNode: HTMLDivElement | undefined;
  headerPortalNode: HTMLDivElement | undefined;
  setNavTitle: (title: string) => void;
  setDocTitle: (title: string) => void;
  setDropdownItems: (items: DropdownMenuProps['menuItems']) => void;
};

export const NavContext = createContext<NavContext>({
  iconPortalNode: undefined,
  headerPortalNode: undefined,
  setNavTitle: () => null,
  setDocTitle: () => null,
  setDropdownItems: () => null,
});
