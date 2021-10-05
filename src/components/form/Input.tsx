import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useContext } from 'react';

import { Label } from '~/components/form/Label';
import { InputProps, NumberInputProps } from '~/components/form/typings';
import { EditContext } from '~/logic/contexts/editContext';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

const StyledInput = styled.input<Pick<InputProps, 'noOutline'>>(
  ({ theme, noOutline }) => ({
    width: '100%',
    height: theme.spacing[40],
    fontSize: theme.fontSize.body,
    padding: theme.spacing[4],
    ...(noOutline && {
      borderColor: 'transparent',
      outlineColor: 'transparent',
      paddingLeft: 0,
    }),
  })
);

export const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    readOnly,
    type,
    className,
    validations,
    disabled,
    name,
    hideLabel,
    noOutline,
    customOnChange,
    alwaysEditable,
  } = props as InputProps;
  const { min, max, step = 1 } = props as NumberInputProps;
  const { register } = useContext(ReactHookFormContext);
  const isEditMode = useContext(EditContext);
  const registeredInput = register?.(name, validations);
  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <StyledInput
        className={className}
        disabled={disabled || (!isEditMode && !alwaysEditable)}
        max={max}
        min={min}
        name={registeredInput?.name}
        noOutline={noOutline}
        readOnly={readOnly || noOutline}
        ref={registeredInput?.ref}
        step={step}
        type={type}
        onBlur={registeredInput?.onBlur}
        onChange={(e) => {
          if (customOnChange) {
            customOnChange(e);
          } else {
            registeredInput?.onChange(e);
          }
        }}
      />
    </Label>
  );
};
