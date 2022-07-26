import { NumberInputProps, Validations } from '~/components/form/typings';

import { Input } from './Input';

export type NumberInputComponentProps<T> = Omit<
  NumberInputProps<T>,
  'type' | 'validations'
> & {
  validations?: Validations<Record<string, unknown>>;
};

export function NumberInput<T extends Record<string, unknown>>({
  label,
  name,
  min,
  max,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
  noOutline,
  step,
  alwaysEditable,
}: NumberInputComponentProps<T>) {
  return (
    <Input
      alwaysEditable={alwaysEditable}
      className={className}
      disabled={disabled}
      hideLabel={hideLabel}
      label={label}
      max={max}
      min={min}
      name={name}
      noOutline={noOutline}
      readOnly={readOnly}
      step={step}
      type="number"
      validations={{ min, max, ...validations }}
    />
  );
}
