import { ChangeEvent } from 'react';
import {
  FieldValues,
  UseFormRegister,
  DeepMap,
  UseFormWatch,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import { SotdlFields } from '~/constants/gameSpecific/sotdl/form';
import {
  MultiFields,
  NestedFieldTypes,
  UnnestedFieldTypes,
} from '~/typings/form';
import { KeysOfUnion, ValuesOf } from '~/typings/util';

export type Validations<T> = {
  required?: boolean;
} & T;

type BaseInputProps<
  InputTypes,
  GameFields extends Record<string, string | Record<string, string>>
> = InputTypes & {
  name:
    | ValuesOf<UnnestedFieldTypes<GameFields>>
    | `${ValuesOf<MultiFields<GameFields>>['fieldName']}.${number}.${string}`
    // | NestedFieldTypes<SotdlFields>[keyof NestedFieldTypes<SotdlFields>]
    | string;

  label?: string;
  readOnly?: boolean;
  type: 'checkbox' | 'text' | 'textarea' | 'number' | 'textarea';
  className?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  noOutline?: boolean;
  customOnChange?: (event: ChangeEvent) => void;
  alwaysEditable?: boolean;
};

export type TextInputProps<G> = BaseInputProps<
  {
    type: 'text';
    validations?: Validations<{
      minLength?: number;
      maxLength?: number;
    }>;
  },
  G
>;

export type NumberInputProps<G> = BaseInputProps<
  {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
    validations?: Validations<{
      min?: number;
      max?: number;
    }>;
  },
  G
>;

export type CheckboxInputProps<G> = BaseInputProps<
  {
    type: 'checkbox';
    validations?: Validations<{}>;
  },
  G
>;

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectInputProps<G> = Omit<
  BaseInputProps<
    {
      validations?: Validations<{}>;
      options: SelectOption[];
      placeholder?: string;
    },
    G
  >,
  'type'
>;

export type InputProps<G> =
  | TextInputProps<G>
  | NumberInputProps<G>
  | CheckboxInputProps<G>;
