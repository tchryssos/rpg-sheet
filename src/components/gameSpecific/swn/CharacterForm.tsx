import { useEffect, useRef, useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { ATTRIBUTES } from '~/constants/game';
import { DEFAULT_VALUES } from '~/constants/gameSpecific/sotdl/form';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useSetupFormHotkeys } from '~/logic/hooks/useSetupFormHotkeys';

import { LoadingIntermediary } from '../../form/LoadingIntermediary';
import { SwnFormNav } from './FormNav';

interface SwnCharacterFormProps {
  isMyCharacter: boolean;
  characterData?: Record<string, unknown>;
}

export const SwnCharacterForm: React.FC<SwnCharacterFormProps> = ({
  isMyCharacter,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  useSetupFormHotkeys(isEditMode, setIsEditMode);

  return (
    <EditContext.Provider value={{ isEditMode, setIsEditMode }}>
      {/* onSubmit handled in FormNav */}
      <FormComponent defaultValues={DEFAULT_VALUES} onSubmit={() => undefined}>
        <SwnFormNav isMyCharacter={isMyCharacter} />
        {/* <BasicInfoInputs />
          <HistoryInputs />
          <FormSection columns={isLessThanSm ? 2 : 4} title="Attributes">
            {ATTRIBUTES.map((a) => (
              <AttributeInput key={a} name={a} />
            ))}
          </FormSection>
          <GridBox columns={isLessThanSm ? 1 : 2}>
            <FormSection title="Defenses">
              <HealthInputs />
            </FormSection>
            <GridBox columns={isLessThanXs ? 1 : 2}>
              <PhysicalTraitsInputs />
              <FormSection title="Metaphysical Traits">
                <EvilInputs />
                <FortuneFateInputs />
              </FormSection>
            </GridBox>
          </GridBox>
          <MagicInputs />
          <ArmorInput />
          <WeaponInput />
          <EquipmentInputs />
          <CurrencyInputs />
          <DescriptionInputs />
          <GeneralNotesInputs /> */}
      </FormComponent>
    </EditContext.Provider>
  );
};
