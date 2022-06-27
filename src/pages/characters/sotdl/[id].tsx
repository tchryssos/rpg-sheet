import { useState } from 'react';

import { CharacterForm } from '~/components/gameSpecific/sotdl/CharacterForm';
import { Layout } from '~/components/meta/Layout';

const SotdlCharacterSheetPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout meta="Shadow of the Demon Lord Character Sheet" title="SotDL Sheet">
      {/* <CharacterForm /> */}
      <div>SHADOW OF THE DEMON LORD</div>
    </Layout>
  );
};

export default SotdlCharacterSheetPage;
