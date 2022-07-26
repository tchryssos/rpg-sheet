import { GridBox } from '~/components/box/GridBox';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { FormSection } from '../../form/FormSection';
import { TextAreaInput } from '../../form/TextAreaInput';
import { TextInput } from '../../form/TextInput';
import { ExpertPathInput } from './ExpertPathInput';
import { MasterPathInput } from './MasterPathInput';
import { NovicePathInput } from './NovicePathInput';

export const HistoryInputs: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    <FormSection columns={1} title="History">
      <GridBox columns={isLessThanSm ? 2 : 4}>
        <TextInput<SotdlCharacterData> name="ancestry" />
        <NovicePathInput />
        <ExpertPathInput />
        <MasterPathInput />
      </GridBox>
      <GridBox alignItems="start" columns={isLessThanSm ? 1 : 2}>
        <TextAreaInput<SotdlCharacterData> name="ancestry_benefits" />
        <TextAreaInput<SotdlCharacterData> name="languages" />
        <TextAreaInput<SotdlCharacterData> name="professions" />
        <TextAreaInput<SotdlCharacterData> name="path_benefits" />
      </GridBox>
    </FormSection>
  );
};
