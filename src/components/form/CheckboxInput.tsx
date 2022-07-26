import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useFormContext } from 'react-hook-form';

import { CheckboxInputProps } from '~/components/form/typings';
import { useIsEditingLocked } from '~/logic/hooks/useIsEditingLocked';

import { BaseButton } from '../buttons/BaseButton';
import { Check } from '../icons/Check';
import { Input } from './Input';
import { Label } from './Label';

const Wrapper = styled.div`
  width: fit-content;
  position: relative;
`;

const CheckButton = styled(BaseButton)(({ theme }) => ({
  width: theme.spacing[40],
  height: theme.spacing[40],
}));

const CheckInput = styled(Input)`
  padding: 0;
  margin: 0;
  position: absolute;
  opacity: 0;
  z-index: -1;
`;

type CheckboxBaseProps<T> = Omit<
  CheckboxInputProps<T>,
  'type' | 'onChange' | 'customOnChange'
>;

type CheckboxProps<T> = CheckboxBaseProps<T> &
  (
    | {
        inputLike?: false;
        customOnChange?: () => void;
        isChecked?: false;
      }
    | {
        inputLike: true;
        customOnChange: () => void;
        isChecked: boolean;
      }
  );

export function CheckboxInput<T extends Record<string, unknown>>({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
  alwaysEditable,
  customOnChange,
  inputLike,
  isChecked,
}: CheckboxProps<T>) {
  const { watch, setValue } = useFormContext();
  const checked = inputLike ? isChecked : watch(name);

  const isEditingLocked = useIsEditingLocked(Boolean(alwaysEditable));
  const canEdit = !disabled && !readOnly && !isEditingLocked;

  const onChange = () => {
    if (canEdit) {
      if (customOnChange) {
        customOnChange();
      } else {
        setValue(name as string, !checked);
      }
    }
  };

  return (
    <Wrapper>
      {!inputLike && (
        <CheckInput
          alwaysEditable={alwaysEditable}
          className={className}
          disabled={disabled || readOnly}
          hideLabel={hideLabel}
          label={label}
          name={name}
          type="checkbox"
          validations={validations}
        />
      )}
      <Label<T>
        label={hideLabel || !inputLike ? '' : label || startCase(name)}
        labelFor={name}
      >
        <CheckButton disabled={!canEdit} transparent onClick={onChange}>
          {checked && (
            <Check
              color="text"
              title={`${name} checked`}
              titleId={`${name}-checked`}
            />
          )}
        </CheckButton>
      </Label>
    </Wrapper>
  );
}
