import styled from '@emotion/styled';
import { startCase } from 'lodash';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  ConnectedSelectProps,
  SelectInputProps,
  SelectOption,
} from '~/components/form/typings';
import { EditContext } from '~/logic/contexts/editContext';

import { Text } from '../Text';
import { Label } from './Label';

const placeholderVal = 'placeholder-ignore';

const Selector = styled.select(({ theme, multiple }) => ({
  height: multiple ? theme.spacing[48] : theme.spacing[40],
  padding: theme.spacing[4],
  fontSize: theme.fontSize.body,
  width: '100%',
  marginTop: theme.spacing[8],
  '&:focus, &:hover': {
    height: multiple ? theme.spacing[96] : theme.spacing[48],
  },
}));

function Option({ value, label, disabled }: SelectOption) {
  return (
    <option disabled={disabled} key={value} value={value}>
      {label}
    </option>
  );
}

interface PlaceholderProps {
  placeholder?: string;
}

function Placeholder({ placeholder }: PlaceholderProps) {
  return placeholder ? (
    <option disabled value={placeholderVal}>
      {placeholder}
    </option>
  ) : null;
}

type ValueDisplayProps = Pick<ConnectedSelectProps<never>, 'name'> &
  Pick<SelectInputProps<never>, 'multiple'>;

function ValueDisplay({ name, multiple }: ValueDisplayProps) {
  const { watch } = useFormContext();

  const value: string[] = watch(name || 'FAKE_KEY_NOTHING');

  if (multiple && value) {
    return (
      <Text display="block" marginTop={8}>
        {value.map((v) => startCase(v)).join(', ')}
      </Text>
    );
  }

  return null;
}

export function SelectInput<T extends Record<string, unknown>>(
  props: SelectInputProps<T>
) {
  const {
    label,
    readOnly,
    className,
    disabled,
    options,
    placeholder,
    hideLabel,
    onChange,
    validations,
    multiple,
    maxSelected,
    MultiDisplayComponent = ValueDisplay,
  } = props;

  const isUnconnected = Boolean(onChange);

  const { alwaysEditable, name } = props as ConnectedSelectProps<T>;

  const { register: formContextRegister, setValue, watch } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const nonEditLocked = !isEditMode && !alwaysEditable && !isUnconnected;

  useEffect(() => {
    if (placeholder) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(name, placeholderVal as any);
    }
  }, [setValue, placeholder, name]);

  const register = isUnconnected ? undefined : formContextRegister;

  const watchedValue: string | string[] | undefined = watch(
    name || 'FAKE_KEY_NOTHING'
  );
  const valueLength = Array.isArray(watchedValue)
    ? watchedValue.length
    : undefined;

  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      {!isEditMode && !alwaysEditable && multiple ? null : (
        <Selector
          className={className}
          defaultValue={onChange && placeholder ? placeholderVal : undefined}
          disabled={disabled}
          multiple={multiple}
          onChange={onChange}
          {...register?.(name, validations)}
        >
          <Placeholder placeholder={placeholder} />
          {options.map(
            ({ value, label: optionLabel, disabled: optionDisabled }) => (
              <Option
                disabled={
                  optionDisabled ||
                  nonEditLocked ||
                  readOnly ||
                  Boolean(
                    maxSelected &&
                      valueLength &&
                      valueLength >= maxSelected &&
                      !watchedValue?.includes(value)
                  )
                }
                key={value}
                label={optionLabel}
                value={value}
              />
            )
          )}
        </Selector>
      )}
      <MultiDisplayComponent multiple={multiple} name={name} />
    </Label>
  );
}
