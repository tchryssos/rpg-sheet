import { FIELD_NAMES } from '~/constants/sotdl/form';

import { BonusInput } from '../../form/BonusInput';
import { FormSection } from '../../form/FormSection';
import { NumberInput } from '../../form/NumberInput';

const calcPerceptionBonus = (per: number) => per - 10;

export const PhysicalTraitsInputs: React.FC = () => (
  <FormSection title="Physical Traits">
    <BonusInput
      bonusCalculationFn={calcPerceptionBonus}
      name={FIELD_NAMES.perception}
    />
    <NumberInput min={0} name={FIELD_NAMES.speed} />
    <NumberInput min={0.25} name={FIELD_NAMES.size} step={0.25} />
  </FormSection>
);
