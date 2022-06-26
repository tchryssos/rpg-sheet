import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/form';

import { NumberInput } from '../../../form/NumberInput';

export const EvilInputs: React.FC = () => {
  const { watch } = useFormContext();
  const will: number = watch(FIELD_NAMES.attributes.will, 0);

  return (
    <>
      <NumberInput max={will} min={0} name={FIELD_NAMES.insanity} />
      <NumberInput min={0} name={FIELD_NAMES.corruption} />
    </>
  );
};
