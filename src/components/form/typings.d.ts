import { ChangeEvent } from 'react';
import {
  FieldValues,
  UseFormRegister,
  DeepMap,
  UseFormWatch,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import { SotdlFields } from '~/constants/form';
import {
  ListFieldTypes,
  MultiFields,
  NestedFieldTypes,
  UnnestedFieldTypes,
} from '~/typings/form';
import {
  KeyOfListField,
  KeysOfUnion,
  ListFieldRecord,
  ValuesOf,
} from '~/typings/util';

export type Validations<T> = {
  required?: boolean;
} & T;

export type KeyName<T extends Record<string, unknown>> =
  | Extract<keyof T, string>
  | `${keyof ListFieldRecord<T>}.${number}.${KeyOfListField<T>}`;

type BaseInputProps<T, U extends Record<string, unknown>> = T & {
  name: KeyName<U>;
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

export type TextInputProps<U> = BaseInputProps<
  {
    type: 'text';
    validations?: Validations<{
      minLength?: number;
      maxLength?: number;
    }>;
  },
  U
>;

export type NumberInputProps<U> = BaseInputProps<
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
  U
>;

export type CheckboxInputProps<U> = BaseInputProps<
  {
    type: 'checkbox';
    validations?: Validations<{}>;
  },
  U
>;

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectInputProps<U> = Omit<
  BaseInputProps<
    {
      validations?: Validations<{}>;
      options: SelectOption[];
      placeholder?: string;
    },
    U
  >,
  'type'
>;

export type InputProps<U> =
  | TextInputProps<U>
  | NumberInputProps<U>
  | CheckboxInputProps<U>;
