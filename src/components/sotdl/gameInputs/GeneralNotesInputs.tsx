import styled from '@emotion/styled';

import { FormSection } from '~/components/form/FormSection';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { TextAreaInput } from '../../form/TextAreaInput';

const NotesInput = styled(TextAreaInput)`
  height: ${({ theme }) => theme.spacing[80]};
` as typeof TextAreaInput;

export const GeneralNotesInputs: React.FC = () => (
  <FormSection columns={1} title="General Notes">
    <NotesInput<SotdlCharacterData> hideLabel name="general_notes" />
  </FormSection>
);
