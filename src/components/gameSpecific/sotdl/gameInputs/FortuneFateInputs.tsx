import { FIELD_NAMES } from '~/constants/gameSpecific/sotdl/form';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { CheckboxInput } from '../../../form/CheckboxInput';
import { NumberInput } from '../../../form/NumberInput';

export const FortuneFateInputs: React.FC = () => {
  const isLessThanMd = useBreakpointsLessThan('md');

  return (
    <>
      <NumberInput
        label={isLessThanMd ? 'Fate' : 'Fate Rolls'}
        max={3}
        min={0}
        name={FIELD_NAMES.fateRolls}
      />
      <CheckboxInput name={FIELD_NAMES.fortune} />
    </>
  );
};
