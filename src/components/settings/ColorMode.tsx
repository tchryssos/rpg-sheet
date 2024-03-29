import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { ColorMode as ColorModeType } from '~/constants/theme';
import { ThemeContext } from '~/logic/contexts/themeContext';

import { SelectInput } from '../form/SelectInput';
import { SelectInputProps } from '../form/typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const options: SelectInputProps<any>['options'] = [
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'Light',
    value: 'light',
  },
];

interface ColorModeProps {
  colorModeKey: string;
}

export function ColorMode({ colorModeKey }: ColorModeProps) {
  const { watch, setValue } = useFormContext();
  const { setColorMode } = useContext(ThemeContext);

  const colorMode = watch(colorModeKey);

  useEffect(() => {
    // First, check if the user already has a local storage color mode set
    let savedColorMode = globalThis.localStorage.getItem(
      colorModeKey
    ) as ColorModeType | null;
    // If not, check if the user is reporting a system preference
    if (!savedColorMode) {
      if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
        savedColorMode = 'dark';
      } else {
        savedColorMode = 'light';
      }
    }
    setColorMode(savedColorMode);
    setValue(colorModeKey, savedColorMode);
  }, [setColorMode, setValue, colorModeKey]);

  useEffect(() => {
    setColorMode(colorMode);
    globalThis.localStorage.setItem(colorModeKey, colorMode);
  }, [colorMode, setColorMode, colorModeKey]);

  return (
    <SelectInput
      alwaysEditable
      label="Color mode"
      name="colorMode"
      options={options}
    />
  );
}
