import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextInput } from '~/components/form/TextInput';
import { FIELD_NAMES } from '~/constants/form';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

export const BasicInfoInputs: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    <FormSection columns={1} title="Basic Info">
      <GridBox gridTemplateColumns={isLessThanSm ? '5fr 1fr' : '7fr 1fr'}>
        <TextInput name={FIELD_NAMES.name} />
        <NumberInput max={10} min={0} name={FIELD_NAMES.level} />
      </GridBox>
    </FormSection>
  );
};
