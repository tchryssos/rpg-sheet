import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'text', theme }) => theme.colors[color]};
`;

export const ClipboardCopy: React.FC<IconProps> = ({
  className,
  color,
  title,
  titleId,
}) => (
  <Icon className={className} title={title} titleId={titleId}>
    <Path
      color={color}
      d="M4 7v14h14v2H4c-1.1 0-2-.9-2-2V7h2m16-4c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h3.18C11.6 1.84 12.7 1 14 1c1.3 0 2.4.84 2.82 2H20m-6 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1m-4 4V5H8v12h12V5h-2v2h-8Z"
    />
  </Icon>
);
