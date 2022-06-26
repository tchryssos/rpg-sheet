import styled from '@emotion/styled';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { SubBody } from '~/components/typography/SubBody';
import { FIELD_NAMES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { AddAnotherMultiField } from '../../../form/AddAnotherMultiField';
import { FormSection } from '../../../form/FormSection';
import { Label } from '../../../form/Label';
import { NumberInput } from '../../../form/NumberInput';
import { TextAreaInput } from '../../../form/TextAreaInput';
import { TextInput } from '../../../form/TextInput';

const SmArmorActiveLabel = styled(Label)`
  width: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Something about setValue is overwriting defaultArmor
// if it is set as a constant, so I am setting it to a fn
// that returns the obj, which fixes the problem
const createDefaultArmor = () => ({
  [FIELD_NAMES.armors.defense]: 0,
  [FIELD_NAMES.armors.name]: '',
  [FIELD_NAMES.armors.notes]: '',
});

const armorTemplateColums = '4fr 1fr 4fr';

interface ArmorFieldProps {
  index: number;
  onDelete: (index: number) => void;
}

const ArmorField: React.FC<ArmorFieldProps> = ({ index, onDelete }) => {
  const { setValue, watch } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const isLessThanSm = useBreakpointsLessThan('sm');

  const activeArmorIndex: number | undefined = watch(
    FIELD_NAMES.activeArmorIndex
  );

  const onArmorCheck = () => {
    const newVal = index === activeArmorIndex ? undefined : index;
    setValue(FIELD_NAMES.activeArmorIndex, newVal);
  };

  if (isLessThanSm) {
    return (
      <FlexBox>
        <SmArmorActiveLabel
          label="Act."
          labelFor={FIELD_NAMES.activeArmorIndex}
        >
          <CheckboxInput
            customOnChange={onArmorCheck}
            hideLabel
            inputLike
            isChecked={activeArmorIndex === index}
            name={FIELD_NAMES.activeArmorIndex}
          />
        </SmArmorActiveLabel>
        <FlexBox column mx={8}>
          <GridBox gridTemplateColumns="6fr 2fr" mb={8}>
            <TextInput
              label="Name"
              name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.name}`}
            />
            <NumberInput
              label="Defense"
              min={0}
              name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.defense}`}
            />
          </GridBox>
          <TextAreaInput
            label="Notes"
            name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.notes}`}
          />
        </FlexBox>
        {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
      </FlexBox>
    );
  }

  return (
    <GridBox columns={3} gridTemplateColumns={armorTemplateColums}>
      <GridBox gridTemplateColumns="auto 1fr">
        <CheckboxInput
          customOnChange={onArmorCheck}
          hideLabel
          inputLike
          isChecked={activeArmorIndex === index}
          name={FIELD_NAMES.activeArmorIndex}
        />
        <TextInput
          hideLabel
          name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.name}`}
        />
      </GridBox>
      <NumberInput
        hideLabel
        min={0}
        name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.defense}`}
      />
      <GridBox gridTemplateColumns={isEditMode ? '7fr 1fr' : '1fr'}>
        <TextAreaInput
          hideLabel
          name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.notes}`}
        />
        {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
      </GridBox>
    </GridBox>
  );
};

const HeaderRow: React.FC = () => (
  <GridBox columns={3} gridTemplateColumns={armorTemplateColums}>
    <GridBox gridTemplateColumns="1fr 7fr">
      <SubBody>Active</SubBody>
      <SubBody bold>Name</SubBody>
    </GridBox>
    <SubBody bold>Defense</SubBody>
    <SubBody bold>Notes</SubBody>
  </GridBox>
);

export const ArmorInput: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    <FormSection columns={1} isCollapsable title="Armor">
      <AddAnotherMultiField
        HeaderRow={isLessThanSm ? undefined : HeaderRow}
        createDefaultValue={createDefaultArmor}
        parentFieldName={FIELD_NAMES.armors.fieldName}
      >
        {({ index, onDelete }) => (
          <ArmorField index={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
};
