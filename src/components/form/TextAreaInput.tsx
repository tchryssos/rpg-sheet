import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { TextInputProps } from '~/components/form/typings';
import { VisibilityContext } from '~/logic/contexts/visibilityContext';
import { useIsEditingLocked } from '~/logic/hooks/useIsEditingLocked';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Label } from './Label';

const defaultHeight = 40;

export const TextArea = styled.textarea<{ height?: number }>(
  ({ theme, height }) => ({
    height: pxToRem(height || defaultHeight),
    minHeight: theme.spacing[40],
    fontSize: theme.fontSize.subBody,
    width: '100%',
    padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
    fontFamily: theme.fontFamily.normal,
    resize: 'vertical',
    '-webkit-resizer': {
      height: 40,
      width: 40,
    },
  })
);

export function TextAreaInput<T extends Record<string, unknown>>({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
  alwaysEditable,
}: Omit<TextInputProps<T>, 'type'>) {
  const [height, setHeight] = useState<number>(defaultHeight);

  const { register } = useFormContext();

  const nonEditLocked = useIsEditingLocked(Boolean(alwaysEditable));

  const { getFieldVisibilityInfo, setFieldVisibilityInfo } =
    useContext(VisibilityContext);
  const savedHeight = getFieldVisibilityInfo(name)?.height;

  useEffect(() => {
    if (savedHeight) {
      setHeight(savedHeight);
    }
  }, [savedHeight]);

  // https://stackoverflow.com/a/58989538
  const onMouseUp: MouseEventHandler<HTMLTextAreaElement> = (e) => {
    const el = e.currentTarget;

    if (el.clientHeight !== height) {
      setHeight(el.clientHeight);
      setFieldVisibilityInfo(name, 'height', el.clientHeight);
    }
  };

  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <TextArea
        className={className}
        disabled={disabled}
        height={height}
        readOnly={readOnly || nonEditLocked}
        onMouseUp={onMouseUp}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(name, validations)}
      />
    </Label>
  );
}
