import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/sotdl/form';

import { TextInput } from '../../form/TextInput';

export const NovicePathInput = () => {
  const { watch } = useFormContext();
  const level: number = watch(FIELD_NAMES.level, 0);
  const isNovice = level >= 1;

  return (
    <TextInput disabled={!isNovice} name={FIELD_NAMES.paths.novice_path} />
  );
};
