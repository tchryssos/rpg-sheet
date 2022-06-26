import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { Body } from '~/components/typography/Body';
import { FIELD_NAMES } from '~/constants/gameSpecific/sotdl/form';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { SortableAddAnotherChildProps } from '~/typings/form';

import { AddAnotherMultiField } from '../../../form/AddAnotherMultiField';
import { FormSection } from '../../../form/FormSection';
import { TextAreaInput } from '../../../form/TextAreaInput';
import { TextInput } from '../../../form/TextInput';

const itemTemplateColumns = '4fr 1fr 6fr';
const itemSmallTemplateColumns = '2fr 2fr';
const { fieldName, name, notes, value } = FIELD_NAMES.equipment;

const ItemField: React.FC<SortableAddAnotherChildProps> = ({
  postSortIndex,
  onDeleteFn,
  sortIndexMap,
  fieldId,
}) => {
  const { isEditMode } = useContext(EditContext);
  const isAtLeastSm = useBreakpointsAtLeast('sm');

  const index = sortIndexMap.get(fieldId);

  const onDelete = () => onDeleteFn(postSortIndex);

  return (
    <GridBox
      gridTemplateColumns={
        isAtLeastSm ? itemTemplateColumns : itemSmallTemplateColumns
      }
    >
      <TextInput hideLabel name={`${fieldName}.${index}.${name}`} />
      {isAtLeastSm && (
        <TextInput hideLabel name={`${fieldName}.${index}.${value}`} />
      )}
      <GridBox gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}>
        <TextAreaInput hideLabel name={`${fieldName}.${index}.${notes}`} />
        {isEditMode && (
          <DeleteButton disabled={index === undefined} onDelete={onDelete} />
        )}
      </GridBox>
    </GridBox>
  );
};

const ItemHeader: React.FC = () => {
  const isAtLeastSm = useBreakpointsAtLeast('sm');
  return (
    <GridBox
      gridTemplateColumns={
        isAtLeastSm ? itemTemplateColumns : itemSmallTemplateColumns
      }
    >
      <Body bold>Name</Body>
      {isAtLeastSm && <Body bold>Value</Body>}
      <Body bold>Notes</Body>
    </GridBox>
  );
};

const createDefaultValue = () => ({
  [FIELD_NAMES.equipment.name]: '',
  [FIELD_NAMES.equipment.notes]: '',
  [FIELD_NAMES.equipment.value]: '',
});

export const EquipmentInputs: React.FC = () => (
  <FormSection columns={1} isCollapsable title="Equipment">
    <AddAnotherMultiField
      HeaderRow={ItemHeader}
      createDefaultValue={createDefaultValue}
      parentFieldName={FIELD_NAMES.equipment.fieldName}
      sortProperties={[FIELD_NAMES.equipment.name]}
    >
      {({ index, onDelete, sortIndexMap, fieldId }) => (
        <ItemField
          fieldId={fieldId}
          postSortIndex={index}
          sortIndexMap={sortIndexMap}
          onDeleteFn={onDelete}
        />
      )}
    </AddAnotherMultiField>
  </FormSection>
);
