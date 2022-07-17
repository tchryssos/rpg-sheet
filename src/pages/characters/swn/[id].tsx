import { useState } from 'react';

import { SwnCharacterForm } from '~/components/gameSpecific/swn/CharacterForm';
import { Layout } from '~/components/meta/Layout';

const SwnCharacterSheetPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout meta="Shadow of the Demon Lord Character Sheet" title="SotDL Sheet">
      <SwnCharacterForm />
    </Layout>
  );
};

export default SwnCharacterSheetPage;
