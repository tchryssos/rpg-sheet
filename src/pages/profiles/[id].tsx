import styled from '@emotion/styled';
import { character } from '@prisma/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { Link } from '~/components/Link';
import { LoadingPageSpinner } from '~/components/LoadingSpinner';
import { Layout } from '~/components/meta/Layout';
import { ProfileNav } from '~/components/nav/ProfileNav';
import { Body } from '~/components/typography/Body';
import { SubBody } from '~/components/typography/SubBody';
import { createCharacterSheetRoute } from '~/constants/routing';
import { fetchProfileCharacters } from '~/logic/api/client/fetchProfileCharacters';
import { useBreakpointsIsGreaterThan } from '~/logic/hooks/useBreakpoints';
import { decodeCharacterObj } from '~/logic/utils/decodeCharacterObj';
import { isSuccessfulProfileCharactersResponse } from '~/typings/profiles.guards';

import FourOhFour from '../404';

const ProfileWrapper = styled(GridBox)`
  width: 100%;
`;

const CharactersSection = styled(FormSection)`
  word-break: break-word;
`;

const CharacterLink = styled(Link)`
  padding: ${({ theme }) => theme.spacing[4]};
  border: ${({ theme }) =>
    `${theme.border.borderWidth[1]} solid ${theme.colors.accentLight}`};
`;

const ProfilePage = () => {
  const {
    query: { id },
  } = useRouter();
  const [characters, setCharacters] = useState<character[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const greaterThanXxs = useBreakpointsIsGreaterThan('xxs');
  const greaterThanSm = useBreakpointsIsGreaterThan('sm');

  useEffect(() => {
    if (id) {
      const loadProfile = async () => {
        setIsLoading(true);
        const resp = await fetchProfileCharacters(id as string);
        if (isSuccessfulProfileCharactersResponse(resp)) {
          setCharacters(resp);
        }
        setIsLoading(false);
      };

      loadProfile();
    }
  }, [id]);

  if (!isLoading && !characters) {
    return <FourOhFour />;
  }

  return (
    <Layout meta="rpg sheet profile" title="Profile">
      {isLoading || !characters ? (
        <LoadingPageSpinner title="Profile loading" titleId="profile-loading" />
      ) : (
        <>
          <ProfileNav />
          <ProfileWrapper columns={1}>
            <CharactersSection
              canToggleVisibility={false}
              // eslint-disable-next-line no-nested-ternary
              columns={greaterThanXxs ? (greaterThanSm ? 3 : 2) : 1}
              title="Characters"
            >
              {characters.length ? (
                characters.map((c) => {
                  const characterObj = decodeCharacterObj(c.characterCode);
                  const {
                    level,
                    ancestry,
                  }: { level?: number; ancestry?: string } = characterObj;
                  return (
                    <CharacterLink
                      href={createCharacterSheetRoute(c.id)}
                      key={c.id}
                    >
                      <FlexBox column>
                        <Body>{c.name}</Body>
                        {(level !== undefined || ancestry) && (
                          <SubBody>
                            {level !== undefined ? `Level ${level}` : ''}
                            {level && ancestry ? ' ' : ''}
                            {`${ancestry ? `${ancestry}` : ''}`}
                          </SubBody>
                        )}
                      </FlexBox>
                    </CharacterLink>
                  );
                })
              ) : (
                <Body>No characters for this user.</Body>
              )}
            </CharactersSection>
          </ProfileWrapper>
        </>
      )}
    </Layout>
  );
};

export default ProfilePage;
