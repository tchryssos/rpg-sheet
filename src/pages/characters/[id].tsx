// import styled from '@emotion/styled';
import { Layout } from '~/components/meta/Layout';
import { CharacterForm } from '~/components/sotdl/CharacterForm';

const CharacterSheetPage: React.FC = () => (
  <Layout
    meta="A character sheet for Shadow of the Demon Lord"
    title="Shadow of the Demon Lord"
  >
    <CharacterForm />
  </Layout>
);

export default CharacterSheetPage;
