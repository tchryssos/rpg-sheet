import { useState } from 'react';

import { Layout } from '~/components/meta/Layout';

const SwnCharacterSheetPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout meta="Shadow of the Demon Lord Character Sheet" title="SotDL Sheet">
      {/* <CharacterForm /> */}
      <div>STARS WITHOUT NUMBER</div>
    </Layout>
  );
};

export default SwnCharacterSheetPage;
