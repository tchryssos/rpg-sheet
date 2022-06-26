import { useEffect, useRef } from 'react';

export const useSetupFormHotkeys = (
  isEditMode: boolean,
  setIsEditMode: (editing: boolean) => void
) => {
  const isEditRef = useRef(isEditMode);

  useEffect(() => {
    const formHotKeys = (e: KeyboardEvent) => {
      if (e.key === 'e' && e.ctrlKey) {
        setIsEditMode(!isEditRef.current);
      }
    };

    globalThis.addEventListener('keyup', formHotKeys);
    return () => globalThis.removeEventListener('keyup', formHotKeys);
  }, [setIsEditMode]);

  useEffect(() => {
    isEditRef.current = isEditMode;
  }, [isEditMode]);
};
