import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';
import { useMemo } from 'react';

import { createProfileRoute, SETTINGS_ROUTE } from '~/constants/routing';

import { AuthLink } from '../AuthLink';
import { IconButton } from '../buttons/IconButton';
import { Hamburger } from '../icons/Hamburger';
import { Body } from '../typography/Body';
import { DropdowmMenuProps, DropdownMenu } from './DropdownMenu';

const DropdownAuthLink = styled(AuthLink)`
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  :hover {
    filter: brightness(${({ theme }) => theme.filters.brightnessMod});
  }
`;

const createMenuItems = (
  userId: number | undefined,
  isLoading: boolean
): DropdowmMenuProps['menuItems'] => {
  let items: DropdowmMenuProps['menuItems'] = [
    {
      type: 'link',
      href: SETTINGS_ROUTE,
      text: 'Settings',
    },
  ];

  if (!isLoading) {
    if (userId) {
      items = [
        {
          type: 'link',
          href: createProfileRoute(userId),
          text: 'My characters',
        },
        ...items,
        {
          type: 'special',
          component: (
            <DropdownAuthLink type="logout">
              <Body>Log out</Body>
            </DropdownAuthLink>
          ),
        },
      ];
    } else {
      items = [
        ...items,
        {
          type: 'special',
          component: (
            <DropdownAuthLink type="login">
              <Body>Authenticate</Body>
            </DropdownAuthLink>
          ),
        },
      ];
    }
  }

  items = [{ type: 'label', text: 'Profile' }, ...items];

  return items;
};

interface ProfileDropdownProps {
  dropdownMenuItems: DropdowmMenuProps['menuItems'];
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  dropdownMenuItems,
}) => {
  const { isLoading, user } = useUser();

  const menuItems = useMemo(
    () => [...dropdownMenuItems, ...createMenuItems(user?.id, isLoading)],
    [dropdownMenuItems, user?.id, isLoading]
  );

  return (
    <DropdownMenu menuItems={menuItems}>
      {({ toggleOpen }) => (
        <IconButton onClick={toggleOpen}>
          <Hamburger title="Menu" titleId="menu" />
        </IconButton>
      )}
    </DropdownMenu>
  );
};
