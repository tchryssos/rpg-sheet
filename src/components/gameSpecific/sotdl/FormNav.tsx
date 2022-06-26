import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { BaseFormNav } from '~/components/nav/BaseFormNav';
import { FIELD_NAMES } from '~/constants/gameSpecific/sotdl/form';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

interface FormNavProps {
  isMyCharacter: boolean;
}

export const FormNav: React.FC<FormNavProps> = ({ isMyCharacter }) => {
  const { watch } = useFormContext();
  const name = watch(FIELD_NAMES.name);
  const ancestry = watch(FIELD_NAMES.ancestry);
  const novicePath = watch(FIELD_NAMES.paths.novice_path);
  const expertPath = watch(FIELD_NAMES.paths.expert_path);
  const masterPath = watch(FIELD_NAMES.paths.master_path);

  const isXxs = useBreakpointsLessThan('xs');

  const { setNavTitle, setDocTitle } = useContext(NavContext);

  useEffect(() => {
    const titleClass = masterPath || expertPath || novicePath || '';
    const title = `${name}${
      ancestry && !isXxs
        ? ` - ${ancestry}${titleClass ? ` ${titleClass}` : ''}`
        : ''
    }`;
    setNavTitle(title);
    setDocTitle(title);
  }, [
    name,
    ancestry,
    novicePath,
    expertPath,
    masterPath,
    setNavTitle,
    setDocTitle,
    isXxs,
  ]);

  return <BaseFormNav isMyCharacter={isMyCharacter} />;
};
