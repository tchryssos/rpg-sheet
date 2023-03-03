import styled from '@emotion/styled';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { Layout } from '~/components/meta/Layout';
import { ProfileNav } from '~/components/nav/ProfileNav';
import { CharactersSection } from '~/components/profile/CharactersSection';
import { Text } from '~/components/Text';
import { SHORT_DATE_FORMAT } from '~/constants/dates';
import { prisma } from '~/logic/utils/prisma';
import { StrictCharacter } from '~/typings/characters';
import { StrictUser } from '~/typings/user';

import FourOhFour from '../404';

const DummyImage = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${({ theme }) => theme.colors.accentHeavy};
`;

interface ProfilePageProps {
  userMeta?: Pick<StrictUser, 'createdOn' | 'isPaid'>;
  userCharacters: StrictCharacter[];
}

function ProfilePage({ userMeta, userCharacters }: ProfilePageProps) {
  if (!userMeta) {
    return <FourOhFour />;
  }

  return (
    <Layout meta="rpg sheet profile" title="Profile">
      <ProfileNav />
      <GridBox columns={1} gap={16} width="100%">
        <FlexBox alignItems="center" gap={16}>
          <DummyImage />
          <FlexBox flexDirection="column" gap={8}>
            <Text as="h1" variant="title">
              Doggy Man
            </Text>
            <Text as="p" variant="body-xs">
              Joined {format(userMeta.createdOn, SHORT_DATE_FORMAT)}
            </Text>
          </FlexBox>
        </FlexBox>
        <CharactersSection characters={userCharacters} />
      </GridBox>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<{ props: ProfilePageProps }> => {
  // Character
  const { params } = context;

  let user: StrictUser | undefined;
  let userCharacters: StrictCharacter[] = [];

  if (params?.id) {
    const parsedId = parseInt(params.id as string, 10);

    if (!Number.isNaN(parsedId)) {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: parseInt(params.id as string, 10),
        },
      });
      if (dbUser) {
        user = dbUser as StrictUser;
        userCharacters = ((await prisma.character.findMany({
          where: {
            playerId: user.id,
            deleted: false,
          },
          orderBy: [
            {
              createdOn: 'asc',
            },
          ],
        })) || []) as StrictCharacter[];
      }
    }
  }

  return {
    props: {
      userMeta: user
        ? {
            createdOn: user.createdOn,
            isPaid: user.isPaid,
          }
        : undefined,
      userCharacters,
    },
  };
};

export default ProfilePage;
