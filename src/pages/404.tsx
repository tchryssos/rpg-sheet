import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';

import { TextButton } from '~/components/buttons/TextButton';
import { Link } from '~/components/Link';
import { LogoAscii } from '~/components/LogoAscii';
import { Layout } from '~/components/meta/Layout';
import { Pane } from '~/components/Pane';
import { Title } from '~/components/typography/Title';
import { HOME_ROUTE } from '~/constants/routing/client';
import { NavContext } from '~/logic/contexts/navContext';

const FourOhFourPane = styled(Pane)(({ theme }) => ({
  [theme.breakpoints.xxs]: {
    border: 'none',
    boxShadow: 'none',
  },
}));

const Logo = styled(LogoAscii)`
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const FourOhFourNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('404');
  }, [setNavTitle]);

  return null;
};

const FourOhFour: React.FC = () => (
  <Layout meta="404" title="rpg sheet">
    <FourOhFourNav />
    <FourOhFourPane>
      <Logo />
      <Title mb={16}>404</Title>
      <Link href={HOME_ROUTE}>
        <TextButton buttonLike label="Click to return home" />
      </Link>
    </FourOhFourPane>
  </Layout>
);

export default FourOhFour;
