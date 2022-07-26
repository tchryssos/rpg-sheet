import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { FormSection } from '../../form/FormSection';
import { NumberInput } from '../../form/NumberInput';

export const CurrencyInputs: React.FC = () => (
  <FormSection columns={3} isCollapsable title="Currency">
    <NumberInput<SotdlCharacterData>
      label="Gold"
      min={0}
      name="currency_gold"
    />
    <NumberInput<SotdlCharacterData>
      label="Silver"
      min={0}
      name="currency_silver"
    />
    <NumberInput<SotdlCharacterData>
      label="Copper"
      min={0}
      name="currency_copper"
    />
  </FormSection>
);
