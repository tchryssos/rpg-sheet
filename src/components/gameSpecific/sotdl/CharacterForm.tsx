import { useEffect, useRef, useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { ArmorInput } from '~/components/gameSpecific/sotdl/gameInputs/ArmorInput';
import { AttributeInput } from '~/components/gameSpecific/sotdl/gameInputs/AttributeInput';
import { CurrencyInputs } from '~/components/gameSpecific/sotdl/gameInputs/CurrencyInputs';
import { DescriptionInputs } from '~/components/gameSpecific/sotdl/gameInputs/DescriptionInputs';
import { EquipmentInputs } from '~/components/gameSpecific/sotdl/gameInputs/EquipmentInputs';
import { EvilInputs } from '~/components/gameSpecific/sotdl/gameInputs/EvilInputs';
import { FortuneFateInputs } from '~/components/gameSpecific/sotdl/gameInputs/FortuneFateInputs';
import { GeneralNotesInputs } from '~/components/gameSpecific/sotdl/gameInputs/GeneralNotesInputs';
import { HealthInputs } from '~/components/gameSpecific/sotdl/gameInputs/HealthInputs';
import { HistoryInputs } from '~/components/gameSpecific/sotdl/gameInputs/HistoryInputs';
import { MagicInputs } from '~/components/gameSpecific/sotdl/gameInputs/MagicInputs';
import { PhysicalTraitsInputs } from '~/components/gameSpecific/sotdl/gameInputs/PhysicalTraitsInputs';
import { WeaponInput } from '~/components/gameSpecific/sotdl/gameInputs/WeaponInput';
import { ATTRIBUTES } from '~/constants/game';
import { DEFAULT_VALUES } from '~/constants/gameSpecific/sotdl/form';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useSetupFormHotkeys } from '~/logic/hooks/useSetupFormHotkeys';

import { LoadingIntermediary } from '../../form/LoadingIntermediary';
import { FormNav } from './FormNav';
import { BasicInfoInputs } from './gameInputs/BasicInfoInputs';

export const CharacterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMyCharacter, setIsMyCharacter] = useState(true);
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  useSetupFormHotkeys(isEditMode, setIsEditMode);

  return (
    <EditContext.Provider value={{ isEditMode, setIsEditMode }}>
      {/* onSubmit handled in FormNav */}
      <FormComponent defaultValues={DEFAULT_VALUES} onSubmit={() => undefined}>
        <LoadingIntermediary
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsMyCharacter={setIsMyCharacter}
        >
          <FormNav isMyCharacter={isMyCharacter} />
          <BasicInfoInputs />
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
          <GeneralNotesInputs />
        </LoadingIntermediary>
      </FormComponent>
    </EditContext.Provider>
  );
};
