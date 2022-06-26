import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/gameSpecific/sotdl/form';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { NumberInput } from '../../../form/NumberInput';

export const HealthInputs = () => {
  const { watch, setValue } = useFormContext();

  const isLessThanMd = useBreakpointsLessThan('md');
  let health: number = watch(FIELD_NAMES.health);
  health = parseInt(`${health || 1}`, 10);

  useEffect(() => {
    setValue(FIELD_NAMES.healing_rate, Math.max(Math.floor(health / 4), 1));
  }, [health, setValue]);

  return (
    <>
      <NumberInput min={0} name={FIELD_NAMES.health} />
      <NumberInput
        label={isLessThanMd ? 'H. Rate' : 'Heal Rate'}
        min={1}
        name={FIELD_NAMES.healing_rate}
        noOutline
      />
      <NumberInput
        alwaysEditable
        max={health}
        min={0}
        name={FIELD_NAMES.damage}
      />
      <NumberInput min={0} name={FIELD_NAMES.defense} />
    </>
  );
};
