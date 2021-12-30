import styled from '@emotion/styled';
import capitalize from 'lodash.capitalize';
import { useContext, useEffect, useRef } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { AddAnotherButton } from '~/components/form/AddAnotherButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { SelectInput } from '~/components/form/SelectInput';
import { TextInput } from '~/components/form/TextInput';
import { Body } from '~/components/typography/Body';
import { SubBody } from '~/components/typography/SubBody';
import { SHY } from '~/constants/characterEntities';
import { FIELD_NAMES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';
import {
  useBreakpointsAtLeast,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { FormSection } from '../../form/FormSection';
import { NumberInput } from '../../form/NumberInput';
import { TextAreaInput } from '../../form/TextAreaInput';

const SpellSlash = styled.span(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.fontSize.title,
}));

const SpellDelete = styled(DeleteButton)`
  margin-top: ${pxToRem(17)};
`;

interface SpellFieldProps {
  onDeleteFn: (index: number) => void;
  sortIndexMap: Map<string, number>;
  fieldId: string;
  sortedIndex: number;
}

const spellTypeOptions = [
  {
    value: 'utility',
    label: 'Utility',
  },
  {
    value: 'attack',
    label: 'Attack',
  },
];

const SpellField: React.FC<SpellFieldProps> = ({
  sortIndexMap,
  fieldId,
  onDeleteFn,
  sortedIndex,
}) => {
  const isEditMode = useContext(EditContext);
  const { watch } = useFormContext();
  const isLessThanSm = useBreakpointsLessThan('sm');

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const index = sortIndexMap.get(fieldId)!;

  console.log('input index: ', index);

  const name =
    watch(
      `${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.name}`
    ) || `Spell ${index + 1}`;

  const remainingCastings =
    watch(
      `${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.remainingCastings}`
    ) || 0;
  const totalCastings =
    watch(
      `${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.totalCastings}`
    ) || 0;
  const tradition =
    watch(
      `${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.tradition}`
    ) || '';
  const level =
    watch(
      `${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.rank}`
    ) || 0;
  const type =
    watch(
      `${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.type}`
    ) || 'Utility';

  const sectionTitle = `${isLessThanSm ? '' : '"'}${name}${
    isLessThanSm ? '' : '"'
  }${
    isLessThanSm ? '' : ` ${tradition} ${capitalize(type)} ${level}`
  }: ${remainingCastings}/${totalCastings}`;

  const onDelete = () => onDeleteFn(sortedIndex);

  return (
    <FormSection
      borderless
      canToggleVisibility={false}
      gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      title={sectionTitle}
      visibilityTitle={`spell${index}`}
    >
      <GridBox columns={1} rowGap={16}>
        <GridBox gridTemplateColumns="2fr 1fr">
          <TextInput
            label="Name"
            name={`${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.name}`}
          />
          <FlexBox alignItems="flex-end" gap={8}>
            <NumberInput
              alwaysEditable
              label="Curr. Casts"
              min={0}
              name={`${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.remainingCastings}`}
            />
            <SpellSlash>/</SpellSlash>
            <NumberInput
              label="Total Casts"
              min={0}
              name={`${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.totalCastings}`}
            />
          </FlexBox>
        </GridBox>
        <GridBox columns={3}>
          <TextInput
            label="Tradition"
            name={`${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.tradition}`}
          />
          <SelectInput
            label="Type"
            name={`${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.type}`}
            options={spellTypeOptions}
          />
          <NumberInput
            label="Rank"
            max={10}
            min={0}
            name={`${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.rank}`}
          />
        </GridBox>
        <TextAreaInput
          label="Description"
          name={`${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells.description}`}
        />
      </GridBox>
      {isEditMode && <SpellDelete onDelete={onDelete} />}
    </FormSection>
  );
};

const createDefaultSpell = () => ({
  [FIELD_NAMES.spells.name]: '',
  [FIELD_NAMES.spells.rank]: 0,
  [FIELD_NAMES.spells.tradition]: '',
  [FIELD_NAMES.spells.type]: 'utility',
  [FIELD_NAMES.spells.description]: '',
  [FIELD_NAMES.spells.totalCastings]: 1,
  [FIELD_NAMES.spells.remainingCastings]: 1,
});

export const MagicInputs: React.FC = () => {
  const isLessThanMd = useBreakpointsLessThan('md');

  return (
    <FormSection columns={1} isCollapsable title="Spells">
      <GridBox gridTemplateColumns={`repeat(${isLessThanMd ? 3 : 4}, 1fr)`}>
        <NumberInput label="Power" min={0} name={FIELD_NAMES.spellPower} />
      </GridBox>
      <AddAnotherMultiField
        HeaderRow={undefined}
        createDefaultValue={createDefaultSpell}
        parentFieldName={FIELD_NAMES.spells.fieldName}
        sortProperties={[
          FIELD_NAMES.spells.tradition,
          FIELD_NAMES.spells.rank,
          FIELD_NAMES.spells.name,
        ]}
      >
        {({ index, onDelete, sortIndexMap, fieldId }) => (
          <SpellField
            fieldId={fieldId}
            sortIndexMap={sortIndexMap}
            sortedIndex={index}
            onDeleteFn={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
};
