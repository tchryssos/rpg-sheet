import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export function CurrencyInputs() {
  return (
    <FormSection columns={3} icon={RpgIcons.DollarCoin} title="Currency">
      <NumberInput<SotwwCharacterData> label="Copper" name="currency_copper" />
      <NumberInput<SotwwCharacterData> label="Silver" name="currency_silver" />
      <NumberInput<SotwwCharacterData> label="Gold" name="currency_gold" />
    </FormSection>
  );
}
