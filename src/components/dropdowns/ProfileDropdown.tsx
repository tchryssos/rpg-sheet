import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';
import { useMemo } from 'react';

import { ADMIN_PANEL_ROUTE, SETTINGS_ROUTE } from '~/constants/routing/client';
import { createUsersRoute } from '~/constants/routing/shared';
import { StrictSessionUser } from '~/typings/user';

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
  user: StrictSessionUser | undefined,
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
    if (user?.id) {
      items = [
        {
          type: 'link',
          href: createUsersRoute(user.id),
          text: 'My characters',
        },
        ...(user.role === 'admin'
          ? ([
              {
                type: 'link',
                href: ADMIN_PANEL_ROUTE,
                text: 'Admin panel',
              },
            ] as DropdowmMenuProps['menuItems'])
          : ([] as DropdowmMenuProps['menuItems'])),
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

  const name =
    user?.authProviderData.nickname ||
    user?.authProviderData.name ||
    user?.authProviderData.email;

  items = [{ type: 'label', text: name || 'Profile' }, ...items];

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
    () => [
      ...dropdownMenuItems,
      ...createMenuItems(user as StrictSessionUser, isLoading),
    ],
    [dropdownMenuItems, user, isLoading]
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
