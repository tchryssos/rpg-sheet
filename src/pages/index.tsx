import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';

import { AuthLink } from '~/components/AuthLink';
import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { TextButton } from '~/components/buttons/TextButton';
import { Divider } from '~/components/Divider';
import { Link } from '~/components/Link';
import { LoadingSpinner } from '~/components/LoadingSpinner';
import { LogoAscii } from '~/components/LogoAscii';
import { Layout } from '~/components/meta/Layout';
import { HomeNav } from '~/components/nav/HomeNav';
import { Pane } from '~/components/Pane';
import { Title } from '~/components/typography/Title';
import {
  createProfileRoute,
  NEW_CHARACTER_ROUTE,
} from '~/constants/routing/client';

const HomeWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const HomePane = styled(Pane)(({ theme }) => ({
  [theme.breakpoints.xxs]: {
    border: 'none',
  },
}));

const ButtonWrapper = styled(GridBox)`
  width: 100%;
`;

const AuthLoading = styled(LoadingSpinner)`
  height: ${({ theme }) => theme.spacing[40]};
`;

const Logo = styled(LogoAscii)`
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const Home: React.FC = () => {
  const { user, error, isLoading } = useUser();
  return (
    <Layout
      meta="A collection of online ttrpg character sheets"
      title="rpg sheet"
    >
      <HomeNav />
      <HomeWrapper alignItems="flex-start" justifyContent="center">
        <HomePane>
          <Logo />
          <Title mb={16}>rpg sheet dot&nbsp;games</Title>
          {isLoading ? (
            <AuthLoading title="Auth loading" titleId="auth-loading" />
          ) : (
            <ButtonWrapper columns={1} rowGap={8}>
              {!error && (
                <>
                  {user ? (
                    <Link href={createProfileRoute(user.id)}>
                      <TextButton buttonLike label="My Characters" />
                    </Link>
                  ) : (
                    <AuthLink type="login">
                      <TextButton buttonLike label="Authenticate" />
                    </AuthLink>
                  )}
                  <Divider label="or" />
                </>
              )}
              <Link href={NEW_CHARACTER_ROUTE}>
                <TextButton buttonLike label="Create a Character" />
              </Link>
            </ButtonWrapper>
          )}
        </HomePane>
      </HomeWrapper>
    </Layout>
  );
};
export default Home;
