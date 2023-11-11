import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';

import { RpgIcons } from '~/constants/icons';
import { Theme } from '~/constants/theme';
import { VisibilityContext } from '~/logic/contexts/visibilityContext';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { Color } from '~/typings/theme';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { GridBox, GridBoxProps } from '../box/GridBox';
import { BaseButton } from '../buttons/BaseButton';
import { CollapseButton } from '../buttons/CollapseButton';
import { RpgIcon } from '../icons/RpgIcon';
import { Text } from '../Text';

interface FormSectionProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  columns?: GridBoxProps['columns'];
  isCollapsible?: boolean;
  className?: string;
  visibilityTitle?: string;
  borderless?: boolean;
  gridTemplateColumns?: GridBoxProps['gridTemplateColumns'];
  defaultExpanded?: boolean;
  icon?: RpgIcons;
  gridTemplateRows?: GridBoxProps['gridTemplateRows'];
  isNested?: boolean;
  titleColor?: Color;
  onToggleOpen?: (nextOpenState: boolean) => void;
}

const TitleBox = styled(FlexBox)`
  position: relative;
  overflow: hidden;
  width: auto;
`;

const FormTitle = styled(Text)<Pick<FormSectionProps, 'isCollapsible'>>(
  ({ isCollapsible, theme }) => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...(isCollapsible && {
      paddingLeft: theme.spacing[32],
    }),
  })
);

const Section = styled(FlexBox)`
  overflow: hidden;
  height: 100%;
`;

const createCollapsibleStyles = (theme: Theme, borderless?: boolean) => css`
  border-color: ${borderless ? 'transparent' : theme.colors.textAccent};
  border-width: ${borderless ? 0 : theme.borderWidth[1]};
  border-style: solid;
`;

const Line = styled(Box)`
  height: 0;
  width: 100%;
  ${({ theme }) => createCollapsibleStyles(theme)};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const Container = styled(GridBox)<{ isOpen?: boolean; borderless?: boolean }>`
  ${({ theme, borderless }) => createCollapsibleStyles(theme, borderless)};
  border-top-width: 0;
  height: 100%;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'collapse')};
  padding: ${({ isOpen }) => (isOpen ? '' : 0)};
  height: ${({ isOpen }) => (isOpen ? '' : 0)};
  align-items: start;
  overflow: hidden;
`;

const CollapseToggle = styled(CollapseButton)`
  bottom: -${pxToRem(6)};
  &:hover {
    background-color: transparent;
  }
`;

const ButtonTitleWrapper = styled(BaseButton)`
  border: none;
  height: min-content;
  min-width: 0;
  padding: 0;
  margin: 0;
`;

export function FormSection({
  title,
  children,
  columns,
  isCollapsible = true,
  className,
  visibilityTitle,
  borderless,
  gridTemplateColumns,
  defaultExpanded = true,
  icon,
  gridTemplateRows = 'min-content',
  isNested,
  titleColor,
  onToggleOpen,
}: FormSectionProps) {
  const { getSectionVisibilityInfo, setSectionVisibilityInfo } =
    useContext(VisibilityContext);
  const { isExpanded: initIsExpanded } =
    getSectionVisibilityInfo(visibilityTitle || title) || {};

  // START - SECTION EXPANDED STATUS - START
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  const onChangeExpanded = () => {
    const nextOpenState = !isOpen;
    onToggleOpen?.(nextOpenState);
    setIsOpen(nextOpenState);
    setSectionVisibilityInfo(
      visibilityTitle || title,
      'isExpanded',
      nextOpenState
    );
  };

  useEffect(() => {
    if (initIsExpanded !== undefined) {
      setIsOpen(initIsExpanded);
    }
  }, [initIsExpanded]);
  // END - SECTION COLLAPSED STATUS - END

  return (
    <Section className={className} flexDirection="column">
      <GridBox alignItems="end" gridTemplateColumns="auto 1fr">
        <ButtonTitleWrapper transparent onClick={onChangeExpanded}>
          <GridBox
            alignItems="flex-end"
            color={titleColor}
            gap={8}
            gridTemplateColumns={`auto${icon ? ` ${pxToRem(24)}` : ''}`}
            marginLeft={borderless ? 0 : 4}
          >
            <TitleBox>
              {isCollapsible && (
                <CollapseToggle
                  absolute
                  buttonProps={{ buttonLike: true }}
                  isOpen={isOpen}
                  title={title}
                />
              )}
              <FormTitle
                fontStyle="italic"
                isCollapsible={isCollapsible}
                paddingRight={2}
                variant={isNested ? 'body-lg' : 'title-sm'}
              >
                {title}
              </FormTitle>
            </TitleBox>
            {icon && (
              <Box
                height="100%"
                maxHeight={pxToRem(24)}
                maxWidth={pxToRem(24)}
                width="100%"
              >
                <RpgIcon iconIndex={icon} />
              </Box>
            )}
          </GridBox>
        </ButtonTitleWrapper>
        {!borderless && <Line />}
      </GridBox>
      <Container
        borderless={borderless}
        columns={columns}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
        isOpen={isOpen}
        paddingX={20}
        paddingY={borderless ? 12 : 20}
      >
        {children}
      </Container>
    </Section>
  );
}
