import styled from '@emotion/styled';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { SubBody } from '~/components/typography/SubBody';
import { FIELD_NAMES } from '~/constants/sotdl/form';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { AddAnotherMultiField } from '../../form/AddAnotherMultiField';
import { FormSection } from '../../form/FormSection';
import { Label } from '../../form/Label';
import { TextAreaInput } from '../../form/TextAreaInput';
import { TextInput } from '../../form/TextInput';

const RemoveButton = styled(DeleteButton)(({ theme }) => ({
  marginTop: theme.spacing[20],
  [theme.breakpoints.sm]: {
    marginTop: 0,
  },
}));

const SmWeaponActiveLabel = styled(Label)`
  width: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface WeaponFieldProps {
  index: number;
  onDelete: (index: number) => void;
}

const createDefaultWeapon = () => ({
  [FIELD_NAMES.weapons.name]: '',
  [FIELD_NAMES.weapons.hands]: 'one',
  [FIELD_NAMES.weapons.damage]: '1d3',
  [FIELD_NAMES.weapons.notes]: '',
});

const weaponTemplateColumns = '3fr 1fr 1fr 3fr';

const WeaponField: React.FC<WeaponFieldProps> = ({ index, onDelete }) => {
  const { setValue, watch } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const isLessThanSm = useBreakpointsLessThan('sm');

  const activeWeaponIndex: number | undefined = watch(
    FIELD_NAMES.activeWeaponIndex
  );

  const onWeaponCheck = () => {
    const newVal = index === activeWeaponIndex ? undefined : index;
    setValue(FIELD_NAMES.activeWeaponIndex, newVal);
  };

  if (isLessThanSm) {
    return (
      <FlexBox>
        <SmWeaponActiveLabel
          label="Act."
          labelFor={FIELD_NAMES.activeArmorIndex}
        >
          <CheckboxInput
            customOnChange={onWeaponCheck}
            hideLabel
            inputLike
            isChecked={activeWeaponIndex === index}
            name={FIELD_NAMES.activeWeaponIndex}
          />
        </SmWeaponActiveLabel>
        <FlexBox column mx={8}>
          <GridBox gridTemplateColumns="6fr 2fr" mb={8}>
            <TextInput
              label="Name"
              name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.name}`}
            />
            <TextInput
              label="Hands"
              name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.hands}`}
            />
          </GridBox>
          <GridBox gridTemplateColumns="2fr 6fr">
            <TextInput
              label="Damage"
              name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.damage}`}
            />
            <TextAreaInput
              label="Notes"
              name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.notes}`}
            />
          </GridBox>
        </FlexBox>
        {isEditMode && <RemoveButton onDelete={() => onDelete(index)} />}
      </FlexBox>
    );
  }

  return (
    <GridBox gridTemplateColumns={weaponTemplateColumns}>
      <GridBox gridTemplateColumns="auto 1fr">
        <CheckboxInput
          customOnChange={onWeaponCheck}
          hideLabel
          inputLike
          isChecked={activeWeaponIndex === index}
          name={FIELD_NAMES.activeWeaponIndex}
        />
        <TextInput
          hideLabel
          name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.name}`}
        />
      </GridBox>
      <TextInput
        hideLabel
        name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.hands}`}
      />
      <TextInput
        hideLabel
        name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.damage}`}
      />
      <GridBox gridTemplateColumns={isEditMode ? '7fr 1fr' : '1fr'}>
        <TextAreaInput
          hideLabel
          name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.notes}`}
        />
        {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
      </GridBox>
    </GridBox>
  );
};

const WeaponHeader: React.FC = () => (
  <GridBox gridTemplateColumns={weaponTemplateColumns}>
    <GridBox gridTemplateColumns="1fr 7fr">
      <SubBody>Active</SubBody>
      <SubBody bold>Name</SubBody>
    </GridBox>
    <SubBody bold>Hands</SubBody>
    <SubBody bold>Damage</SubBody>
    <SubBody bold>Notes</SubBody>
  </GridBox>
);

export const WeaponInput: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');

  // const weapons = watch(FIELD_NAMES.weapons.fieldName);
  return (
    <FormSection columns={1} isCollapsable title="Weapons">
      <AddAnotherMultiField
        HeaderRow={isLessThanSm ? undefined : WeaponHeader}
        createDefaultValue={createDefaultWeapon}
        parentFieldName={FIELD_NAMES.weapons.fieldName}
      >
        {({ index, onDelete }) => (
          <WeaponField index={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
};
