import styled from '@emotion/styled';
import { useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { Button } from '~/components/Button';
import { Form as FormComponent } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { ArmorInput } from '~/components/form/gameInputs/ArmorInput';
import { AttributeInput } from '~/components/form/gameInputs/AttributeInput';
import { CurrencyInputs } from '~/components/form/gameInputs/CurrencyInputs';
import { DescriptionInputs } from '~/components/form/gameInputs/DescriptionInputs';
import { EquipmentInputs } from '~/components/form/gameInputs/EquipmentInputs';
import { EvilInputs } from '~/components/form/gameInputs/EvilInputs';
import { FortuneFateInputs } from '~/components/form/gameInputs/FortuneFateInputs';
import { GeneralNotesInputs } from '~/components/form/gameInputs/GeneralNotesInputs';
import { HealthInputs } from '~/components/form/gameInputs/HealthInputs';
import { HistoryInputs } from '~/components/form/gameInputs/HistoryInputs';
import { MagicInputs } from '~/components/form/gameInputs/MagicInputs';
import { PhysicalTraitsInputs } from '~/components/form/gameInputs/PhysicalTraitsInputs';
import { WeaponInput } from '~/components/form/gameInputs/WeaponInput';
import { NumberInput } from '~/components/form/NumberInput';
import { TextInput } from '~/components/form/TextInput';
import { FIELD_NAMES } from '~/constants/form';
import { ATTRIBUTES } from '~/constants/game';
import { EditContext } from '~/logic/contexts/editContext';

const Form = styled(FormComponent)`
  max-width: ${({ theme }) => theme.breakpointValues.lg}px;
`;

export const CharacterForm: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Form onSubmit={() => undefined}>
      <EditContext.Provider value={isEditMode}>
        <FlexBox flex={1} justifyContent="flex-end">
          <Button label="Edit" onClick={() => setIsEditMode(!isEditMode)} />
        </FlexBox>
        <GridBox gridTemplateColumns="7fr 1fr">
          <TextInput name={FIELD_NAMES.name} />
          <NumberInput max={10} min={0} name={FIELD_NAMES.level} />
        </GridBox>
        <HistoryInputs />
        <FormSection columns={4} title="Attributes">
          {ATTRIBUTES.map((a) => (
            <AttributeInput key={a} name={a} />
          ))}
        </FormSection>
        <GridBox>
          <FormSection title="Defenses">
            <HealthInputs />
          </FormSection>
          <GridBox>
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
      </EditContext.Provider>
    </Form>
  );
};
