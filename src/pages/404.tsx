import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';

import { LogoAscii } from '~/components/ascii/LogoAscii';
import { NotFoundAscii } from '~/components/ascii/NotFoundAscii';
import { TextButton } from '~/components/buttons/TextButton';
import { Link } from '~/components/Link';
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

function FourOhFourNav() {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('rpg sheet');
  }, [setNavTitle]);

  return null;
}

function FourOhFour() {
  return (
    <Layout meta="404" title="rpg sheet">
      <FourOhFourNav />
      <FourOhFourPane>
        <NotFoundAscii />
        <Title mb={16}>404</Title>
        <Link href={HOME_ROUTE}>
          <TextButton buttonLike label="Click to return home" />
        </Link>
      </FourOhFourPane>
    </Layout>
  );
}

export default FourOhFour;
