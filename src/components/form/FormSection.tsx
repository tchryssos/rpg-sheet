import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import theme from '~/constants/theme';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { GridBox, GridBoxProps } from '../box/GridBox';
import { Button } from '../Button';
import { Body } from '../typography/Body';

const Text = styled(Body)`
  white-space: nowrap;
`;

const Section = styled(FlexBox)`
  height: 100%;
`;

const collapsableStyles = css`
  border-color: ${theme.colors.grey};
  border-width: ${theme.border.borderWidth[1]};
  border-style: solid;
`;

const Line = styled(Box)`
  height: 0;
  width: 100%;
  ${collapsableStyles};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const Container = styled(GridBox)<{ isOpen?: boolean }>`
  ${collapsableStyles};
  border-top-width: 0;
  height: 100%;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'collapse')};
  padding: ${({ isOpen }) => (isOpen ? '' : 0)};
  height: ${({ isOpen }) => (isOpen ? '' : 0)};
`;

const CollapseButton = styled(Button)<{ isOpen?: boolean }>`
  transform: rotate(${({ isOpen }) => (isOpen ? -90 : 90)}deg);
  margin-left: ${theme.spacing[8]};
`;

const Collapsed = styled.div`
  ${collapsableStyles};
  border-top-width: 0;
  height: ${theme.spacing[12]};
  /* height: 0 on container still leaves a 1px space */
  transform: translateY(-1px);
`;

interface FormSectionProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  columns?: GridBoxProps['columns'];
  isCollapsable?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  columns,
  isCollapsable,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Section column>
      <FlexBox alignItems="flex-end" ml={4}>
        <Text italic>{title}</Text>
        {isCollapsable && (
          <CollapseButton
            isOpen={isOpen}
            label=">"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
        <Line ml={8} />
      </FlexBox>
      <Container columns={columns} isOpen={isOpen} px={8} py={16}>
        {children}
      </Container>
      {!isOpen && <Collapsed />}
    </Section>
  );
};
