import { FIELD_NAMES } from '~/constants/form';

import { BonusInput } from '../../../form/BonusInput';
import { NumberInputProps } from '../../../form/typings';

type AttributeInputProps = Omit<NumberInputProps, 'type' | 'name'> & {
  name: keyof typeof FIELD_NAMES['attributes'];
};

const bonusCalc = (attr: number) => attr - 10;

export const AttributeInput: React.FC<AttributeInputProps> = ({ name }) => (
  <BonusInput bonusCalculationFn={bonusCalc} max={20} min={0} name={name} />
);
