// import styled from '@emotion/styled';
import { CharacterForm } from '~/components/CharacterForm';
import { Layout } from '~/components/meta/Layout';

const SOTDL: React.FC = () => (
  <Layout
    meta="A character sheet for Shadow of the Demon Lord"
    title="Shadow of the Demon Lord"
  >
    <CharacterForm />
  </Layout>
);

export default SOTDL;
