import styled from '@emotion/styled';
import sortBy from 'lodash.sortby';
import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { EditContext } from '~/logic/contexts/editContext';
import { KeyOfListField, ListFieldRecord } from '~/typings/util';

import { Box } from '../box/Box';
import { SubBody } from '../typography/SubBody';
import { AddAnotherButton } from './AddAnotherButton';

type AddAnotherMultiFieldProps<T extends Record<string, unknown>> = {
  parentFieldName: Extract<keyof ListFieldRecord<T>, string>;
  children: (fieldProps: {
    index: number;
    onDelete: (index: number) => void;
    fieldId: string;
    sortIndexMap: Map<string, number>;
  }) => React.ReactNode;
  createDefaultValue: () => Record<string, unknown>;
  HeaderRow?: React.FC;
  // @TODO Type this so that it knows which properties are available via
  // parentFieldName
  sortProperties?: KeyOfListField<T>[];
};

const ChildContainer = styled(Box)`
  max-width: 100%;
`;

export function AddAnotherMultiField<T extends Record<string, unknown>>({
  parentFieldName,
  children,
  createDefaultValue,
  HeaderRow,
  sortProperties,
}: AddAnotherMultiFieldProps<T>) {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: parentFieldName as string,
  });
  const parentField: Record<string, unknown>[] | undefined =
    watch(parentFieldName);

  const { isEditMode } = useContext(EditContext);

  // https://github.com/react-hook-form/react-hook-form/discussions/4264#discussioncomment-398509
  const [sortIndexMap, setSortIndexMap] = useState(
    new Map(fields.map(({ id }, index) => [id, index]))
  );

  useEffect(() => {
    if (fields.length !== sortIndexMap.size) {
      setSortIndexMap(new Map(fields.map(({ id }, index) => [id, index])));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  let controlledFields = fields.map((field, i) => ({
    ...field,
    ...parentField?.[i],
  }));

  if (sortProperties) {
    controlledFields = sortBy(controlledFields, sortProperties);
  }

  const onCreate = () => {
    const nextValue = createDefaultValue();
    append(nextValue);
  };

  const onDelete = (index: number) => {
    const removedId = controlledFields[index].id;
    const valueRemovedIndex = sortIndexMap.get(removedId)!;

    const nextValue = [...(parentField || [])];
    nextValue.splice(valueRemovedIndex, 1);

    remove(valueRemovedIndex);
  };

  return (
    <>
      {isEditMode && <AddAnotherButton onClick={onCreate} />}
      {Boolean(controlledFields.length) && HeaderRow && <HeaderRow />}
      {controlledFields.map((field, i) => (
        <ChildContainer key={field.id}>
          {children({
            index: i,
            onDelete,
            fieldId: field.id,
            sortIndexMap,
          })}
        </ChildContainer>
      ))}
      {!controlledFields.length && (
        <SubBody italic>
          Empty (use edit mode to add some {parentFieldName})
        </SubBody>
      )}
    </>
  );
}
