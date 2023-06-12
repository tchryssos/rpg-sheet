import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { Text } from '~/components/Text';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { SortableAddAnotherChildProps } from '~/typings/form';
import {
  SotdlCharacterData,
  SotdlEquipment,
} from '~/typings/sotdl/characterData';

import { AddAnotherMultiField } from '../../../form/AddAnotherMultiField';
import { FormSection } from '../../../form/FormSection';
import { TextAreaInput } from '../../../form/TextAreaInput';
import { TextInput } from '../../../form/TextInput';

const itemTemplateColumns = '4fr 6fr';
const itemSmallTemplateColumns = '2fr 2fr';

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
      <TextInput<SotdlCharacterData>
        hideLabel
        name={`equipment.${index!}.equipment_name`}
      />
      <GridBox gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}>
        <TextAreaInput hideLabel name={`equipment.${index!}.equipment_notes`} />
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
      <Text as="label" fontWeight="bold" variant="body">
        Name
      </Text>
      <Text as="label" fontWeight="bold" variant="body">
        Notes
      </Text>
    </GridBox>
  );
};

const createDefaultValue = (): SotdlEquipment => ({
  equipment_name: '',
  equipment_notes: '',
});

export const EquipmentInputs: React.FC = () => (
  <FormSection columns={1} isCollapsible title="Equipment">
    <AddAnotherMultiField<SotdlCharacterData>
      HeaderRow={ItemHeader}
      createDefaultValue={createDefaultValue}
      parentFieldName="equipment"
      sortProperties={['equipment_name']}
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