import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { FormSection } from '../../../form/containers/FormSection';
import { TextAreaInput } from '../../../form/TextAreaInput';

export function DescriptionInputs() {
  const isLessThanXs = useBreakpointsLessThan('xs');
  return (
    <FormSection
      columns={isLessThanXs ? 1 : 2}
      isCollapsible
      title="Description"
    >
      <TextAreaInput<SotdlCharacterData> name="background" />
      <TextAreaInput<SotdlCharacterData> name="appearance" />
    </FormSection>
  );
}
