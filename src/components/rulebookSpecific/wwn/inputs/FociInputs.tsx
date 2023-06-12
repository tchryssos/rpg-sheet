import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { AddAnotherMultiDelete } from '~/components/buttons/DeleteButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData, WwnFocus } from '~/typings/wwn/characterData';

interface FocusItemProps {
  index: number;
  onDelete: (idx: number) => void;
}

const createMakeFocusFieldName =
  (index: number) =>
  (focusKey: keyof WwnFocus): `foci.${number}.${keyof WwnFocus}` =>
    `foci.${index}.${focusKey}`;

function FocusItem({ index, onDelete }: FocusItemProps) {
  const { isEditMode } = useContext(EditContext);
  const { watch } = useFormContext();

  const makeFocusFieldName = createMakeFocusFieldName(index);

  const focusNameFieldName = makeFocusFieldName('focus_name');
  const focusLevelFieldName = makeFocusFieldName('focus_level');

  const sectionTitle = `${watch(focusNameFieldName)}: Lvl ${watch(
    focusLevelFieldName
  )}`;

  return (
    <FormSection
      borderless
      canToggleVisibility={false}
      gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      title={sectionTitle}
      visibilityTitle={`focus${index}`}
    >
      <FlexBox flexDirection="column" gap={16}>
        <TextInput<WwnCharacterData> label="Name" name={focusNameFieldName} />
        <TextAreaInput<WwnCharacterData>
          label="Description"
          name={makeFocusFieldName('focus_description')}
        />
        <NumberInput<WwnCharacterData>
          label="Level"
          max={2}
          min={1}
          name={focusLevelFieldName}
        />
      </FlexBox>
      {isEditMode && (
        <AddAnotherMultiDelete
          disabled={index === undefined}
          onDelete={() => onDelete(index)}
        />
      )}
    </FormSection>
  );
}

const createDefaultFocus = (): WwnFocus => ({
  focus_name: '',
  focus_description: '',
  focus_level: 1,
});

export function FociInputs() {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    <FormSection
      columns={isLessThanSm ? 1 : 2}
      icon={RpgIcons.Lightbulb}
      title="Foci"
    >
      <AddAnotherMultiField<WwnCharacterData>
        createDefaultValue={createDefaultFocus}
        parentFieldName="foci"
      >
        {(childProps) => <FocusItem {...childProps} />}
      </AddAnotherMultiField>
    </FormSection>
  );
}