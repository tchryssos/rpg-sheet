import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { DEFAULT_VALUES } from '~/constants/cwn/form';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import { CwnArmor, CwnCharacterData } from '~/typings/cwn/characterData';

interface AcContextInterface {
  rangedAc: number;
  meleeAc: number;
  calculateAc: (armor?: CwnArmor) => void;
}

export const AcContext = createContext<AcContextInterface>({
  meleeAc: DEFAULT_VALUES.armor_class_melee,
  rangedAc: DEFAULT_VALUES.armor_class_ranged,
  calculateAc: () => null,
});

type AcProviderProps = PropsWithChildren<unknown>;

export function AcProvider({ children }: AcProviderProps) {
  const [rangedAc, setRangedAc] = useState(DEFAULT_VALUES.armor_class_ranged);
  const [meleeAc, setMeleeAc] = useState(DEFAULT_VALUES.armor_class_melee);
  const currentDexModRef = useRef<number>(0);

  const { getValues } = useFormContext<CwnCharacterData>();

  const calculateAc = useCallback(
    (armor?: CwnArmor) => {
      const dexterity = getValues('attribute_dexterity');
      const dexBonus = calcAttributeBonus(dexterity);
      // If the fn is called with a new armor equip, calc based on armor
      if (armor) {
        const accessoryBonuses = armor.accessories.reduce(
          (totalBonuses, accessory) => ({
            melee: totalBonuses.melee + accessory.ac_melee,
            ranged: totalBonuses.ranged + accessory.ac_ranged,
          }),
          { melee: 0, ranged: 0 }
        );

        setRangedAc(armor.ac_ranged + accessoryBonuses.ranged + dexBonus);
        setMeleeAc(armor.ac_melee + accessoryBonuses.melee + dexBonus);
      } else {
        // else calc based on dex change
        const dexDifferential = dexBonus - currentDexModRef.current;
        if (dexDifferential) {
          setRangedAc((lastRanged) => lastRanged + dexDifferential);
          setMeleeAc((lastMelee) => lastMelee + dexDifferential);
        }
      }
      currentDexModRef.current = dexBonus;
    },
    [getValues]
  );

  const providerValue = useMemo(
    () => ({
      meleeAc,
      rangedAc,
      calculateAc,
    }),
    [rangedAc, meleeAc, calculateAc]
  );

  return (
    <AcContext.Provider value={providerValue}>{children}</AcContext.Provider>
  );
}
