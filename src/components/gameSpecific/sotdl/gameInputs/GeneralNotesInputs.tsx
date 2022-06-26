import styled from '@emotion/styled';

import { FormSection } from '~/components/form/FormSection';
import { FIELD_NAMES } from '~/constants/form';

import { TextAreaInput } from '../../../form/TextAreaInput';

const NotesInput = styled(TextAreaInput)`
  height: ${({ theme }) => theme.spacing[80]};
`;

export const GeneralNotesInputs: React.FC = () => (
  <FormSection columns={1} title="General Notes">
    <NotesInput hideLabel name={FIELD_NAMES.generalNotes} />
  </FormSection>
);
