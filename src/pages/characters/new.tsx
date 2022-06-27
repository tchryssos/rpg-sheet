import { useContext, useEffect } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { TextButton } from '~/components/buttons/TextButton';
import { Link } from '~/components/Link';
import { Layout } from '~/components/meta/Layout';
import { Title } from '~/components/typography/Title';
import {
  createSotdlCharacterSheetRoute,
  createSwnCharacterSheetRoute,
  NEW_CHARACTER_ID,
} from '~/constants/routing/client';
import { NavContext } from '~/logic/contexts/navContext';

const NewCharacterNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);
  useEffect(() => {
    setNavTitle('New Character');
  }, [setNavTitle]);

  return null;
};

const NewCharacter: React.FC = () => (
  <Layout
    meta="Select a rulebook and create a new character"
    title="New Character"
  >
    <NewCharacterNav />
    <FlexBox column gap={16}>
      <Title>Select a Rulebook</Title>
      <Link href={createSotdlCharacterSheetRoute(NEW_CHARACTER_ID)}>
        {/* TODO: Replace TextButton with cool animated div of demon */}
        <TextButton buttonLike label="Shadow of the Demon Lord" />
      </Link>
      <Link href={createSwnCharacterSheetRoute(NEW_CHARACTER_ID)}>
        {/* TODO: Replace TextButton with cool animated div of space */}
        <TextButton buttonLike label="Stars Without Number" />
      </Link>
    </FlexBox>
  </Layout>
);

export default NewCharacter;
