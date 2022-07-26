import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { BonusInput } from '../../form/BonusInput';
import { NumberInputProps } from '../../form/typings';

type AttributeInputProps<T> = Omit<NumberInputProps<T>, 'type' | 'name'> & {
  name: keyof Pick<
    SotdlCharacterData,
    | 'attribute_agility'
    | 'attribute_intellect'
    | 'attribute_strength'
    | 'attribute_will'
  >;
};

const bonusCalc = (attr: number) => attr - 10;

export function AttributeInput<T extends Record<string, unknown>>({
  name,
}: AttributeInputProps<T>) {
  return (
    <BonusInput bonusCalculationFn={bonusCalc} max={20} min={0} name={name} />
  );
}
