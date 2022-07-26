import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { CheckboxInput } from '../../form/CheckboxInput';
import { NumberInput } from '../../form/NumberInput';

export const FortuneFateInputs: React.FC = () => {
  const isLessThanMd = useBreakpointsLessThan('md');

  return (
    <>
      <NumberInput<SotdlCharacterData>
        label={isLessThanMd ? 'Fate' : 'Fate Rolls'}
        max={3}
        min={0}
        name="fate_rolls"
      />
      <CheckboxInput<SotdlCharacterData> name="fortune" />
    </>
  );
};
