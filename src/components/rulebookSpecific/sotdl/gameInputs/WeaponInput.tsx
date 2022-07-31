import styled from '@emotion/styled';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { SubBody } from '~/components/typography/SubBody';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData, SotdlWeapon } from '~/typings/sotdl/characterData';

import { AddAnotherMultiField } from '../../../form/AddAnotherMultiField';
import { FormSection } from '../../../form/FormSection';
import { Label } from '../../../form/Label';
import { TextAreaInput } from '../../../form/TextAreaInput';
import { TextInput } from '../../../form/TextInput';

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
` as typeof Label;

interface WeaponFieldProps {
  index: number;
  onDelete: (index: number) => void;
}

const createDefaultWeapon = (): SotdlWeapon => ({
  weapon_name: '',
  weapon_hands: 'one',
  weapon_damage: '1d3',
  weapon_notes: '',
});

const weaponTemplateColumns = '3fr 1fr 1fr 3fr';

const createWeaponFieldName = (
  name: keyof SotdlWeapon,
  index: number
): `weapons.${number}.${keyof SotdlWeapon}` => `weapons.${index}.${name}`;

const WeaponField: React.FC<WeaponFieldProps> = ({ index, onDelete }) => {
  const { setValue, watch } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const isLessThanSm = useBreakpointsLessThan('sm');

  const activeWeaponIndex: number | undefined = watch<keyof SotdlCharacterData>(
    'active_weapon_index'
  );

  const onWeaponCheck = () => {
    const newVal = index === activeWeaponIndex ? undefined : index;
    setValue<keyof SotdlCharacterData>('active_weapon_index', newVal);
  };

  if (isLessThanSm) {
    return (
      <FlexBox>
        <SmWeaponActiveLabel<SotdlCharacterData>
          label="Act."
          labelFor="active_weapon_index"
        >
          <CheckboxInput<SotdlCharacterData>
            customOnChange={onWeaponCheck}
            hideLabel
            inputLike
            isChecked={activeWeaponIndex === index}
            name="active_weapon_index"
          />
        </SmWeaponActiveLabel>
        <FlexBox column mx={8}>
          <GridBox gridTemplateColumns="6fr 2fr" mb={8}>
            <TextInput<SotdlCharacterData>
              label="Name"
              name={createWeaponFieldName('weapon_name', index)}
            />
            <TextInput<SotdlCharacterData>
              label="Hands"
              name={createWeaponFieldName('weapon_hands', index)}
            />
          </GridBox>
          <GridBox gridTemplateColumns="2fr 6fr">
            <TextInput<SotdlCharacterData>
              label="Damage"
              name={createWeaponFieldName('weapon_damage', index)}
            />
            <TextAreaInput<SotdlCharacterData>
              label="Notes"
              name={createWeaponFieldName('weapon_notes', index)}
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
        <CheckboxInput<SotdlCharacterData>
          customOnChange={onWeaponCheck}
          hideLabel
          inputLike
          isChecked={activeWeaponIndex === index}
          name="active_weapon_index"
        />
        <TextInput<SotdlCharacterData>
          hideLabel
          name={createWeaponFieldName('weapon_name', index)}
        />
      </GridBox>
      <TextInput<SotdlCharacterData>
        hideLabel
        name={createWeaponFieldName('weapon_hands', index)}
      />
      <TextInput
        hideLabel
        name={createWeaponFieldName('weapon_damage', index)}
      />
      <GridBox gridTemplateColumns={isEditMode ? '7fr 1fr' : '1fr'}>
        <TextAreaInput<SotdlCharacterData>
          hideLabel
          name={createWeaponFieldName('weapon_notes', index)}
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
      <AddAnotherMultiField<SotdlCharacterData>
        HeaderRow={isLessThanSm ? undefined : WeaponHeader}
        createDefaultValue={createDefaultWeapon}
        parentFieldName="weapons"
      >
        {({ index, onDelete }) => (
          <WeaponField index={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
};