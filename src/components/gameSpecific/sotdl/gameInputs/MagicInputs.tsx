import styled from '@emotion/styled';
import capitalize from 'lodash.capitalize';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { SelectInput } from '~/components/form/SelectInput';
import { TextInput } from '~/components/form/TextInput';
import { FIELD_NAMES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { SortableAddAnotherChildProps } from '~/typings/form';

import { FormSection } from '../../../form/FormSection';
import { NumberInput } from '../../../form/NumberInput';
import { TextAreaInput } from '../../../form/TextAreaInput';

const SpellSlash = styled.span(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.fontSize.title,
}));

const SpellDelete = styled(DeleteButton)`
  margin-top: ${pxToRem(17)};
`;

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

const createMakeSpellName =
  (index: number) =>
  (
    spellKey: keyof typeof FIELD_NAMES['spells']
  ): `spells.${number}.${string}` =>
    `${FIELD_NAMES.spells.fieldName}.${index}.${FIELD_NAMES.spells[spellKey]}`;

const SpellField: React.FC<SortableAddAnotherChildProps> = ({
  sortIndexMap,
  fieldId,
  onDeleteFn,
  postSortIndex,
}) => {
  const { isEditMode } = useContext(EditContext);
  const { watch } = useFormContext();
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');
  const index = sortIndexMap.get(fieldId);

  if (index === undefined) {
    return null;
  }

  const makeSpellName = createMakeSpellName(index);

  const name = watch(makeSpellName('name')) || `Spell ${index + 1}`;

  const remainingCastings = watch(makeSpellName('remainingCastings')) || 0;
  const totalCastings = watch(makeSpellName('totalCastings')) || 0;
  const tradition = watch(makeSpellName('tradition')) || '';
  const level = watch(makeSpellName('rank')) || 0;
  const type = watch(makeSpellName('type')) || 'Utility';
  const maxCasts = watch(makeSpellName('totalCastings')) || 100;

  /**
   * Switches between the following formats for spell names based on screen size:
   * Fireball: 2/2 (on mobile and very small screens)
   * vs
   * "Fireball" Flame Attack 1: 2/2 (on everything else)
   */
  const sectionTitle = `${isLessThanSm ? '' : '"'}${name}${
    isLessThanSm ? '' : '"'
  }${
    isLessThanSm ? '' : ` ${tradition} ${capitalize(type)} ${level}`
  }: ${remainingCastings}/${totalCastings}`;

  const onDelete = () => onDeleteFn(postSortIndex);

  return (
    <FormSection
      borderless
      canToggleVisibility={false}
      gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      title={sectionTitle}
      visibilityTitle={`spell${index}`}
    >
      <GridBox columns={1} rowGap={16}>
        <GridBox gridTemplateColumns={isLessThanSm ? '1fr 1fr' : '2fr 1fr'}>
          <TextInput label="Name" name={makeSpellName('name')} />
          <FlexBox alignItems="flex-end" gap={8}>
            <NumberInput
              alwaysEditable
              label={`${isLessThanXs ? '' : 'Cur. '}Casts`}
              max={maxCasts}
              min={0}
              name={makeSpellName('remainingCastings')}
            />
            <SpellSlash>/</SpellSlash>
            <NumberInput
              hideLabel={isLessThanXs}
              label="Max Casts"
              min={0}
              name={makeSpellName('totalCastings')}
            />
          </FlexBox>
        </GridBox>
        <GridBox columns={3}>
          <TextInput label="Tradition" name={makeSpellName('tradition')} />
          <SelectInput
            label="Type"
            name={makeSpellName('type')}
            options={spellTypeOptions}
          />
          <NumberInput
            label="Rank"
            max={10}
            min={0}
            name={makeSpellName('rank')}
          />
        </GridBox>
        <TextAreaInput
          label="Description"
          name={makeSpellName('description')}
        />
      </GridBox>
      {isEditMode && (
        <SpellDelete disabled={index === undefined} onDelete={onDelete} />
      )}
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
            postSortIndex={index}
            sortIndexMap={sortIndexMap}
            onDeleteFn={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
};
