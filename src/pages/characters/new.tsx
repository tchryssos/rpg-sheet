import { FlexBox } from '~/components/box/FlexBox';
import { TextButton } from '~/components/buttons/TextButton';
import { Link } from '~/components/Link';
import { Layout } from '~/components/meta/Layout';
import {
  createSotdlCharacterSheetRoute,
  createSwnCharacterSheetRoute,
  NEW_CHARACTER_ID,
} from '~/constants/routing/client';

const NewCharacter: React.FC = () => (
  <Layout
    meta="Select a rulebook for your new character"
    title="Select a rulebook"
  >
    <FlexBox column gap={16}>
      <Link href={createSotdlCharacterSheetRoute(NEW_CHARACTER_ID)}>
        <TextButton buttonLike />
      </Link>
      <Link href={createSwnCharacterSheetRoute(NEW_CHARACTER_ID)}>
        <TextButton buttonLike />
      </Link>
    </FlexBox>
  </Layout>
);

export default NewCharacter;
