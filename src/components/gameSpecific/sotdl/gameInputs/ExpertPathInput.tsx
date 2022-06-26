import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/form';

import { TextInput } from '../../../form/TextInput';

export const ExpertPathInput = () => {
  const { watch } = useFormContext();
  const level: number = watch(FIELD_NAMES.level, 0);
  const isExpert = level >= 3;

  return (
    <TextInput disabled={!isExpert} name={FIELD_NAMES.paths.expert_path} />
  );
};
