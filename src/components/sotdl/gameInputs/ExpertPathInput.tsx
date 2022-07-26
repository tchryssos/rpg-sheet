import { useFormContext } from 'react-hook-form';

import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { TextInput } from '../../form/TextInput';

export const ExpertPathInput = () => {
  const { watch } = useFormContext();
  const level: number = watch<keyof SotdlCharacterData>('level', 0);
  const isExpert = level >= 3;

  return (
    <TextInput<SotdlCharacterData> disabled={!isExpert} name="expert_path" />
  );
};
