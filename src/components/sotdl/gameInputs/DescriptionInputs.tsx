import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { FormSection } from '../../form/FormSection';
import { TextAreaInput } from '../../form/TextAreaInput';

export const DescriptionInputs: React.FC = () => {
  const isLessThanXs = useBreakpointsLessThan('xs');
  return (
    <FormSection
      columns={isLessThanXs ? 1 : 2}
      isCollapsable
      title="Description"
    >
      <TextAreaInput<SotdlCharacterData> name="background" />
      <TextAreaInput<SotdlCharacterData> name="appearance" />
    </FormSection>
  );
};
