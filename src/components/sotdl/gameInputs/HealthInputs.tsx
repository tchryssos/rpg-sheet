import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { NumberInput } from '../../form/NumberInput';

export const HealthInputs = () => {
  const { watch, setValue } = useFormContext();

  const isLessThanMd = useBreakpointsLessThan('md');
  let health: number = watch<keyof SotdlCharacterData>('health');
  health = parseInt(`${health || 1}`, 10);

  useEffect(() => {
    setValue<keyof SotdlCharacterData>(
      'healing_rate',
      Math.max(Math.floor(health / 4), 1)
    );
  }, [health, setValue]);

  return (
    <>
      <NumberInput<SotdlCharacterData> min={0} name="health" />
      <NumberInput<SotdlCharacterData>
        label={isLessThanMd ? 'H. Rate' : 'Heal Rate'}
        min={1}
        name="healing_rate"
        noOutline
      />
      <NumberInput<SotdlCharacterData>
        alwaysEditable
        max={health}
        min={0}
        name="damage"
      />
      <NumberInput<SotdlCharacterData> min={0} name="defense" />
    </>
  );
};
