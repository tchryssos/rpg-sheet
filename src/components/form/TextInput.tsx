import { TextInputProps } from '~/components/form/typings';

import { Input } from './Input';

export function TextInput<T extends Record<string, unknown>>({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
  alwaysEditable,
}: Omit<TextInputProps<T>, 'type'>) {
  return (
    <Input
      alwaysEditable={alwaysEditable}
      className={className}
      disabled={disabled}
      hideLabel={hideLabel}
      label={label}
      name={name}
      readOnly={readOnly}
      type="text"
      validations={validations}
    />
  );
}
