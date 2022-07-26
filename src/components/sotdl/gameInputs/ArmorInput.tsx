import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { SubBody } from '~/components/typography/SubBody';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlArmor, SotdlCharacterData } from '~/typings/sotdl/characterData';

import { AddAnotherMultiField } from '../../form/AddAnotherMultiField';
import { FormSection } from '../../form/FormSection';
import { Label } from '../../form/Label';
import { NumberInput } from '../../form/NumberInput';
import { TextAreaInput } from '../../form/TextAreaInput';
import { TextInput } from '../../form/TextInput';

// Something about setValue is overwriting defaultArmor
// if it is set as a constant, so I am setting it to a fn
// that returns the obj, which fixes the problem
const createDefaultArmor = (): SotdlArmor => ({
  armor_defense: 0,
  armor_name: '',
  armor_notes: '',
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

  const activeArmorIndex: number | undefined =
    watch<keyof SotdlCharacterData>('active_armor_index');

  const onArmorCheck = () => {
    const newVal = index === activeArmorIndex ? undefined : index;
    setValue<keyof SotdlCharacterData>('active_armor_index', newVal);
  };

  if (isLessThanSm) {
    return (
      <FlexBox>
        <Label<SotdlCharacterData>
          label="Act."
          labelFor="active_armor_index"
          size="sm"
        >
          <CheckboxInput<SotdlCharacterData>
            customOnChange={onArmorCheck}
            hideLabel
            inputLike
            isChecked={activeArmorIndex === index}
            name="active_armor_index"
          />
        </Label>
        <FlexBox column mx={8}>
          <GridBox gridTemplateColumns="6fr 2fr" mb={8}>
            <TextInput<SotdlCharacterData>
              label="Name"
              name={`armors.${index}.armor_name`}
            />
            <NumberInput<SotdlCharacterData>
              label="Defense"
              min={0}
              name={`armors.${index}.armor_defense`}
            />
          </GridBox>
          <TextAreaInput<SotdlCharacterData>
            label="Notes"
            name={`armors.${index}.armor_notes`}
          />
        </FlexBox>
        {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
      </FlexBox>
    );
  }

  return (
    <GridBox columns={3} gridTemplateColumns={armorTemplateColums}>
      <GridBox gridTemplateColumns="auto 1fr">
        <CheckboxInput<SotdlCharacterData>
          customOnChange={onArmorCheck}
          hideLabel
          inputLike
          isChecked={activeArmorIndex === index}
          name="active_armor_index"
        />
        <TextInput<SotdlCharacterData>
          hideLabel
          name={`armors.${index}.armor_name`}
        />
      </GridBox>
      <NumberInput<SotdlCharacterData>
        hideLabel
        min={0}
        name={`armors.${index}.armor_defense`}
      />
      <GridBox gridTemplateColumns={isEditMode ? '7fr 1fr' : '1fr'}>
        <TextAreaInput<SotdlCharacterData>
          hideLabel
          name={`armors.${index}.armor_notes`}
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
      <AddAnotherMultiField<SotdlCharacterData>
        HeaderRow={isLessThanSm ? undefined : HeaderRow}
        createDefaultValue={createDefaultArmor}
        parentFieldName="armors"
      >
        {({ index, onDelete }) => (
          <ArmorField index={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
};
