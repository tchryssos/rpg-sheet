import styled from '@emotion/styled';
import { PropsWithChildren, useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { Label } from '~/components/form/Label';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { CwnCharacterData, CwnMajorInjury } from '~/typings/cwn/characterData';

import { InjuryInputItem } from './InjuryInputItem';

const InjuryLabel = styled(Label)`
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
` as typeof Label;

const createDefaultValue = () =>
  ({
    name: '',
    description: '',
  } satisfies CwnMajorInjury);

function InjuryChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    <GridBox columns={isLessThanSm ? 1 : 2} width="100%">
      {children}
    </GridBox>
  );
}

export function MajorInjuriesInput() {
  const { setIsEditMode } = useContext(EditContext);
  return (
    <InjuryLabel<CwnCharacterData>
      label="Major Injuries"
      labelFor="major_injuries"
      size="sm"
    >
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={InjuryChildWrapper}
        alwaysEditable
        createDefaultValue={createDefaultValue}
        emptyLabel="No Major Injuries"
        parentFieldName="major_injuries"
        onAdd={() => setIsEditMode(true)}
      >
        {({ index, onDelete, fieldId }) => (
          <InjuryInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </InjuryLabel>
  );
}
