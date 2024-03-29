import { UserProvider } from '@auth0/nextjs-auth0';
import { css, Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import type { AppProps } from 'next/app';
import { useContext, useEffect, useMemo, useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { LoginItemsContextProvider } from '~/components/providers/LoginItemsContextProvider';
import { NotificationsContextProvider } from '~/components/providers/NotificationsContextProvider';
import { ColorMode, Theme, themes } from '~/constants/theme';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { ThemeContext } from '~/logic/contexts/themeContext';
import { createNotification } from '~/logic/utils/notifications';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { NotificationBody } from '~/typings/notifications';
import { BreakpointSize } from '~/typings/theme';

const marPadZero = css`
  margin: 0;
  padding: 0;
`;

const baseStyle = css`
  height: 100%;
  width: 100%;
  ${marPadZero};
`;

const createGlobalStyles = (theme: Theme) => css`
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Uchen&display=swap');
  html {
    background-color: ${theme.colors.background};
    ${baseStyle};
  }
  body {
    ${baseStyle};
    position: relative;
    box-sizing: border-box;
    font-family: ${theme.fontFamily.normal};
    color: ${theme.colors.text};
  }
  #app,
  #__next {
    ${baseStyle};
  }
  div,
  input,
  select,
  textarea,
  ul,
  li,
  a {
    box-sizing: border-box;
  }
  ul {
    list-style: none;
  }
  input,
  select,
  textarea {
    font-family: ${theme.fontFamily.normal};
    background-color: ${theme.colors.accentLight};
    color: ${theme.colors.text};
    border-radius: ${pxToRem(4)};
    border-width: ${theme.borderWidth[1]};
    :disabled {
      background-color: ${theme.colors.smudge};
    }
  }
  p,
  h1,
  h2,
  h3,
  pre,
  figure,
  ul,
  li {
    ${marPadZero};
  }
  li {
    list-style: none;
  }
  ul {
    list-style: none;
  }
`;

const GlobalWrapper = styled(FlexBox)`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
`;

interface ErrorIntermediaryProps {
  error?: NotificationBody;
}

function ErrorIntermediary({ error }: ErrorIntermediaryProps) {
  const { addNotifications } = useContext(NotificationsContext);

  useEffect(() => {
    if (error) {
      addNotifications([
        createNotification({
          ...error,
          type: 'error',
        }),
      ]);
    }
  }, [error, addNotifications]);

  return null;
}

function Page({ Component, pageProps: { error, ...pageProps } }: AppProps) {
  const [windowBreakpoints, setWindowBreakpoints] = useState<BreakpointSize[]>([
    'xxs',
  ]);
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  const theme = themes[colorMode];

  useEffect(() => {
    Object.keys(theme.breakpointValues).forEach((key, i, arr) => {
      const queryAdjective = key === 'xss' ? 'max' : 'min';
      const query = globalThis.matchMedia(
        `(${queryAdjective}-width: ${
          theme.breakpointValues[key as BreakpointSize]
        }px)`
      );
      if (query.matches) {
        setWindowBreakpoints(arr.slice(0, i + 1) as BreakpointSize[]);
      }
      query.addEventListener('change', (e) => {
        setWindowBreakpoints(
          arr.slice(0, e.matches ? i + 1 : i) as BreakpointSize[]
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeContextValue = useMemo(
    () => ({
      colorMode,
      setColorMode,
    }),
    [colorMode]
  );

  return (
    <UserProvider>
      <ThemeContext.Provider value={themeContextValue}>
        <ThemeProvider theme={theme}>
          <BreakpointsContext.Provider value={windowBreakpoints}>
            <NotificationsContextProvider>
              <ErrorIntermediary error={error} />
              <LoginItemsContextProvider>
                <GlobalWrapper>
                  <Global styles={createGlobalStyles(theme)} />
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <Component {...pageProps} />
                </GlobalWrapper>
              </LoginItemsContextProvider>
            </NotificationsContextProvider>
          </BreakpointsContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </UserProvider>
  );
}

// eslint-disable-next-line import/no-default-export
export default Page;
