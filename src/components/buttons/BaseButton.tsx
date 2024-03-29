import styled from '@emotion/styled';
import { Button as ButtonUnstyled } from '@mui/base';
import { forwardRef } from 'react';

import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { Color } from '~/typings/theme';

import { FlexBox } from '../box/FlexBox';
import { BaseButtonProps } from './types';

type StyledProps = Pick<BaseButtonProps, 'transparent' | 'severity'>;

const StyledButton = styled(ButtonUnstyled, {
  shouldForwardProp: (prop) => prop !== 'transparent' && prop !== 'severity',
})<StyledProps>(({ theme, transparent, severity }) => {
  let severityColor: Color = theme.mode === 'light' ? 'primary' : 'accentHeavy';
  switch (severity) {
    case 'danger':
      severityColor = 'danger';
      break;
    case 'warning':
      severityColor = 'warning';
      break;
    case 'success':
      severityColor = 'success';
      break;
    case 'secondary':
      severityColor = 'smudge';
      break;
    case 'normal':
    default:
      break;
  }
  return {
    color: theme.colors.text,
    cursor: 'pointer',
    minHeight: theme.spacing[32],
    minWidth: theme.spacing[32],
    backgroundColor: transparent ? 'transparent' : theme.colors[severityColor],
    border: transparent
      ? `${theme.borderWidth[1]} solid ${
          severity !== 'normal'
            ? theme.colors[severityColor]
            : theme.colors.text
        }`
      : 'none',
    borderRadius: theme.spacing[2],
    // Non-standard padding matches default button padding
    padding: `${pxToRem(1)} ${pxToRem(6)}`,
    ':hover': {
      filter: `brightness(${theme.filters.brightnessMod})`,
    },
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: theme.colors.accentLight,
      border: 'none',
      filter: 'brightness(1.0)',
    },
  };
});

const ButtonLike = StyledButton.withComponent(FlexBox);

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  function BaseButton(
    {
      onClick,
      className,
      type = 'button',
      disabled,
      children,
      transparent,
      buttonLike,
      severity = 'normal',
      ...rest
    },
    forwardedRef
  ) {
    if (buttonLike) {
      return (
        <ButtonLike
          center
          className={className}
          /**
           * Because of the `.withComponent` trickery we're doing here
           * to get the button styles on a FlexBox, ts isn't happy with this ref
           * being typed as a Button or a Div. HOPEFULLY no one does anything too crazy
           * with this ref to the point where we actually run into a problem, so
           * I'm just ignoring this error.
           */
          ref={forwardedRef as unknown}
          severity={severity}
          transparent={Boolean(transparent) || undefined}
        >
          {children}
        </ButtonLike>
      );
    }
    return (
      <StyledButton
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        className={className}
        disabled={disabled || (!onClick && type !== 'submit')}
        ref={forwardedRef}
        severity={severity}
        transparent={Boolean(transparent) || undefined}
        type={type}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    );
  }
);
