import { FIELD_NAMES } from '~/constants/form';

import { FormSection } from '../../../form/FormSection';
import { NumberInput } from '../../../form/NumberInput';

export const CurrencyInputs: React.FC = () => (
  <FormSection columns={3} isCollapsable title="Currency">
    <NumberInput label="Gold" min={0} name={FIELD_NAMES.currency.gold} />
    <NumberInput label="Silver" min={0} name={FIELD_NAMES.currency.silver} />
    <NumberInput label="Copper" min={0} name={FIELD_NAMES.currency.copper} />
  </FormSection>
);
