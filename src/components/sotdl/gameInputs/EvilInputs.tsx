import { useFormContext } from 'react-hook-form';

import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { NumberInput } from '../../form/NumberInput';

export const EvilInputs: React.FC = () => {
  const { watch } = useFormContext();
  const will: number = watch<keyof SotdlCharacterData>('attribute_will', 0);

  return (
    <>
      <NumberInput<SotdlCharacterData> max={will} min={0} name="insanity" />
      <NumberInput<SotdlCharacterData> min={0} name="corruption" />
    </>
  );
};
