import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';
import {
  useBreakpointsIsExactly,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';

import { FormSection } from '../FormSection';
import { NumberInput } from '../NumberInput';

export const MagicInputs: React.FC = () => {
  const { watch } = useContext(ReactHookFormContext);
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isExactlySm = useBreakpointsIsExactly('sm');
  const power: number = watch?.(FIELD_NAMES.spellPower.fieldName);
  return (
    <FormSection columns={1} isCollapsable title="Spells">
      <GridBox gridTemplateColumns={isLessThanSm ? '100%' : '1fr 8fr'}>
        <NumberInput
          label="Power"
          min={0}
          name={FIELD_NAMES.spellPower.fieldName}
        />
        <GridBox
          gridTemplateColumns={
            isLessThanSm ? 'repeat(4, 1fr)' : 'repeat(11, 1fr)'
          }
        >
          {Object.keys(FIELD_NAMES.spellPower.castings.castingsByLevel).map(
            (level) =>
              parseInt(level, 10) <= power && (
                <NumberInput
                  key={FIELD_NAMES.spellPower.castings.castingsByLevel[level]}
                  label={`${isExactlySm ? '' : 'Lvl '}${level}`}
                  max={power + 1 - parseInt(level, 10)}
                  min={0}
                  name={FIELD_NAMES.spellPower.castings.castingsByLevel[level]}
                />
              )
          )}
        </GridBox>
      </GridBox>
    </FormSection>
  );
};