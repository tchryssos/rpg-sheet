import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { TabPanel } from '~/components/tabs/TabPanel';
import { Tabs } from '~/components/tabs/Tabs';
import { TabLabelObject } from '~/components/tabs/types';
import { RpgIcons } from '~/constants/icons';
import { DEFAULT_VALUES } from '~/constants/wwn/form';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { StrictCharacter } from '~/typings/characters';
import { WwnCharacterData } from '~/typings/wwn/characterData';

import { AttributeInputs } from './inputs/AttributeInputs';
import { BackgroundInputs } from './inputs/BackgroundInputs';
import { BasicInfoInputs } from './inputs/BasicInfoInputs';
import { ClassInputs } from './inputs/ClassInputs';
import { DefenseInputs } from './inputs/DefenseInputs';
import { FociInputs } from './inputs/FociInputs';
import { HealthInputs } from './inputs/HealthInputs';
import { SkillInputs } from './inputs/SkillInputs';

interface WwnCharacterSheetProps {
  character: StrictCharacter<WwnCharacterData>;
}

const tabLabels: TabLabelObject[] = [
  {
    label: 'Description',
    icon: RpgIcons.Scroll,
  },
  {
    label: 'Stats',
    icon: RpgIcons.Dice,
  },
  {
    label: 'Abilities',
    icon: RpgIcons.Ripple,
  },
  {
    label: 'Combat',
    icon: RpgIcons.DualDaggers,
  },
  {
    label: 'Equipment',
    icon: RpgIcons.Chest,
  },
];

export function CharacterSheet({ character }: WwnCharacterSheetProps) {
  const {
    isEditMode,
    setIsEditMode,
    // isLoading,
    // setIsLoading,
    // isMyCharacter,
    setIsMyCharacter,
    editProviderVal,
  } = useSheetState();
  useSheetHotkeys(isEditMode, setIsEditMode);

  const { user } = useUser();

  useEffect(() => {
    setIsMyCharacter(character?.playerId === user?.id);
  }, [character?.playerId, setIsMyCharacter, user?.id]);

  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  return (
    <EditContext.Provider value={editProviderVal}>
      <FormComponent
        defaultValues={character?.characterData || DEFAULT_VALUES}
        onSubmit={() => undefined}
      >
        <div>FormNav!</div>
        <Tabs tabLabels={tabLabels}>
          {/* Description */}
          <TabPanel>
            <GridBox columns={isLessThanSm ? 1 : 2} gap={48}>
              <BasicInfoInputs />
              <BackgroundInputs />
            </GridBox>
          </TabPanel>
          {/* Stats */}
          <TabPanel>
            <AttributeInputs />
            <SkillInputs />
          </TabPanel>
          {/* Abilities */}
          <TabPanel>
            <ClassInputs />
            <FociInputs />
          </TabPanel>
          {/* Combat */}
          <TabPanel>
            <GridBox columns={isLessThanSm ? 1 : 2} gap={48}>
              <HealthInputs />
              <DefenseInputs />
            </GridBox>
          </TabPanel>
          {/* Equipment */}
          <TabPanel>
            <div>Equipment</div>
          </TabPanel>
        </Tabs>
      </FormComponent>
    </EditContext.Provider>
  );
}
