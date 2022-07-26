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
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotdlCharacterData, SotdlSpell } from '~/typings/sotdl/characterData';

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
  (spellKey: keyof SotdlSpell): `spells.${number}.${keyof SotdlSpell}` =>
    `spells.${index}.${spellKey}`;

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

  const name = watch(makeSpellName('spell_name')) || `Spell ${index + 1}`;

  const remainingCastings: SotdlSpell['spell_remaining_castings'] =
    watch(makeSpellName('spell_remaining_castings')) || 0;
  const totalCastings: SotdlSpell['spell_total_castings'] =
    watch(makeSpellName('spell_total_castings')) || 0;
  const tradition: SotdlSpell['spell_tradition'] =
    watch(makeSpellName('spell_tradition')) || '';
  const level: SotdlSpell['spell_rank'] =
    watch(makeSpellName('spell_rank')) || 0;
  const type: SotdlSpell['spell_type'] =
    watch(makeSpellName('spell_type')) || 'Utility';
  const maxCasts: SotdlSpell['spell_total_castings'] =
    watch(makeSpellName('spell_total_castings')) || 100;

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
          <TextInput label="Name" name={makeSpellName('spell_name')} />
          <FlexBox alignItems="flex-end" gap={8}>
            <NumberInput
              alwaysEditable
              label={`${isLessThanXs ? '' : 'Cur. '}Casts`}
              max={maxCasts}
              min={0}
              name={makeSpellName('spell_remaining_castings')}
            />
            <SpellSlash>/</SpellSlash>
            <NumberInput
              hideLabel={isLessThanXs}
              label="Max Casts"
              min={0}
              name={makeSpellName('spell_total_castings')}
            />
          </FlexBox>
        </GridBox>
        <GridBox columns={3}>
          <TextInput
            label="Tradition"
            name={makeSpellName('spell_tradition')}
          />
          <SelectInput
            label="Type"
            name={makeSpellName('spell_type')}
            options={spellTypeOptions}
          />
          <NumberInput
            label="Rank"
            max={10}
            min={0}
            name={makeSpellName('spell_rank')}
          />
        </GridBox>
        <TextAreaInput
          label="Description"
          name={makeSpellName('spell_description')}
        />
      </GridBox>
      {isEditMode && (
        <SpellDelete disabled={index === undefined} onDelete={onDelete} />
      )}
    </FormSection>
  );
};

const createDefaultSpell = (): SotdlSpell => ({
  spell_name: '',
  spell_rank: 0,
  spell_tradition: '',
  spell_type: 'utility',
  spell_description: '',
  spell_total_castings: 1,
  spell_remaining_castings: 1,
});

export const MagicInputs: React.FC = () => {
  const isLessThanMd = useBreakpointsLessThan('md');

  return (
    <FormSection columns={1} isCollapsable title="Spells">
      <GridBox gridTemplateColumns={`repeat(${isLessThanMd ? 3 : 4}, 1fr)`}>
        <NumberInput<SotdlCharacterData>
          label="Power"
          min={0}
          name="spell_power"
        />
      </GridBox>
      <AddAnotherMultiField<SotdlCharacterData>
        HeaderRow={undefined}
        createDefaultValue={createDefaultSpell}
        parentFieldName="spells"
        sortProperties={['spell_tradition', 'spell_rank', 'spell_name']}
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
