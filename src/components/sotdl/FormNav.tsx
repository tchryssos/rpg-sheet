import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/sotdl/form';
import {
  createCharacterSheetRoute,
  NEW_CHARACTER_ID,
} from '~/constants/routing';
import { saveCharacter } from '~/logic/api/client/saveCharacter';
import { EditContext } from '~/logic/contexts/editContext';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useCopyCode } from '~/logic/hooks/useCopyCode';
import { useGetCharacterCode } from '~/logic/hooks/useGetCharacterCode';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';

import { IconButton } from '../buttons/IconButton';
import { CharacterCodeForm } from '../CharacterCodeForm';
import { DropdowmMenuProps } from '../dropdowns/DropdownMenu';
import { ClipboardCopy } from '../icons/ClipboardCopy';
import { ClipboardCopyFail } from '../icons/ClipboardCopyFail';
import { ClipboardCopySuccess } from '../icons/ClipboardCopySuccess';
import { Pencil } from '../icons/Pencil';
import { Save } from '../icons/Save';
import { LoadingStatus } from '../icons/StatusIcon';

interface FormNavProps {
  isMyCharacter: boolean;
}

interface CopyIconProps {
  copySuccess?: boolean;
}

const CopyIcon: React.FC<CopyIconProps> = ({ copySuccess }) => {
  if (copySuccess) {
    return (
      <ClipboardCopySuccess
        color="success"
        title="Copy success"
        titleId="copy-success-icon"
      />
    );
  }
  if (copySuccess === false) {
    return (
      <ClipboardCopyFail
        color="danger"
        title="Copy failed"
        titleId="copy-failed-icon"
      />
    );
  }
  return <ClipboardCopy title="Copy" titleId="copy-icon" />;
};

const CopyButton: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState<boolean | undefined>();
  const { getValues, formState, reset } = useFormContext();
  const { isDirty } = formState;

  const copyCode = useCopyCode(setCopySuccess);

  useEffect(() => {
    if (isDirty) {
      setCopySuccess(undefined);
    }
  }, [isDirty]);

  useEffect(() => {
    if (copySuccess && reset && getValues) {
      const valueObj = getValues();
      reset(valueObj, { keepValues: true });
    }
  }, [copySuccess, reset, getValues]);

  return (
    <IconButton type="submit" onClick={copyCode}>
      <CopyIcon copySuccess={copySuccess} />
    </IconButton>
  );
};

interface SaveButtonProps {
  playerId: number;
}

const SaveButton: React.FC<SaveButtonProps> = ({ playerId }) => {
  const [saveStatus, setSaveStatus] = useState<LoadingStatus>('neutral');
  const { query } = useRouter();
  const { watch } = useFormContext();
  const characterCode = useGetCharacterCode();
  const { push } = useRouter();

  const characterName = watch('name');

  const onSave = async () => {
    setSaveStatus('loading');
    const resp = await saveCharacter({
      id: query.id as number | typeof NEW_CHARACTER_ID,
      characterCode,
      playerId,
      name: characterName,
    });
    if (isSuccessfulCharacterResponse(resp)) {
      setSaveStatus('success');
      if (query.id === NEW_CHARACTER_ID) {
        push(createCharacterSheetRoute(resp.id));
      }
    } else {
      setSaveStatus('error');
    }
  };

  return (
    <IconButton
      hasError={saveStatus === 'error'}
      isLoading={saveStatus === 'loading'}
      isNeutral={saveStatus === 'neutral'}
      isSuccessful={saveStatus === 'success'}
      type="submit"
      onClick={onSave}
    >
      <Save title="Save character" titleId="save-character" />
    </IconButton>
  );
};
// END - Icons and Buttons - End

const NavButtons: React.FC<Pick<FormNavProps, 'isMyCharacter'>> = ({
  isMyCharacter,
}) => {
  const { user } = useUser();
  const { isEditMode, setIsEditMode } = useContext(EditContext);

  return (
    <>
      {user && isMyCharacter ? (
        <SaveButton playerId={user.id} />
      ) : (
        <CopyButton />
      )}
      <IconButton onClick={() => setIsEditMode(!isEditMode)}>
        <Pencil
          color={isEditMode ? 'success' : 'text'}
          title="Edit pencil"
          titleId="edit-pencil-icon"
        />
      </IconButton>
    </>
  );
};

export const FormNav: React.FC<FormNavProps> = ({ isMyCharacter }) => {
  const { user } = useUser();

  const copyCode = useCopyCode();

  const { watch } = useFormContext();
  const name = watch(FIELD_NAMES.name);
  const ancestry = watch(FIELD_NAMES.ancestry);
  const novicePath = watch(FIELD_NAMES.paths.novice_path);
  const expertPath = watch(FIELD_NAMES.paths.expert_path);
  const masterPath = watch(FIELD_NAMES.paths.master_path);

  const isXxs = useBreakpointsLessThan('xs');

  const {
    iconPortalNode,
    isNavExpanded,
    setNavTitle,
    expandedPortalNode,
    setNavExpanded,
    setDropdownItems,
    setDocTitle,
  } = useContext(NavContext);

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

  // START - NAV MENU ITEMS - START
  const menuItems = useMemo(() => {
    let items: DropdowmMenuProps['menuItems'] = [
      {
        type: 'button',
        text: isNavExpanded ? 'Close code form' : 'Upload with code',
        onClick: () => setNavExpanded(!isNavExpanded),
      },
    ];

    if (user?.id) {
      items = [
        {
          type: 'button',
          text: 'Copy character code',
          onClick: copyCode,
        },
        ...items,
      ];
    }

    items = [{ type: 'label', text: 'Form' }, ...items];

    return items;
  }, [copyCode, isNavExpanded, setNavExpanded, user?.id]);

  useEffect(() => {
    if (setDropdownItems) {
      setDropdownItems(menuItems);
    }
  }, [menuItems, setDropdownItems]);
  // END - NAV MENU ITEMS - END

  return (
    <>
      {iconPortalNode &&
        createPortal(
          <NavButtons isMyCharacter={isMyCharacter} />,
          iconPortalNode
        )}
      {isNavExpanded &&
        expandedPortalNode &&
        createPortal(<CharacterCodeForm />, expandedPortalNode)}
    </>
  );
};
