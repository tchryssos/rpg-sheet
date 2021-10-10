import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { pxToRem } from '~/utils/styles';

import { FlexBox } from './box/FlexBox';
import { TextButton } from './buttons/TextButton';
import { Label } from './form/Label';
import { TextArea } from './form/TextAreaInput';

const FormWrapper = styled(FlexBox)(({ theme }) => ({
  alignSelf: 'flex-start',
  width: '100%',
  [theme.breakpoints.sm]: {
    width: '75%',
  },
  [theme.breakpoints.lg]: {
    width: '60%',
  },
  [theme.breakpoints.xl]: {
    width: '50%',
  },
}));

const CCInput = styled(TextArea)`
  min-height: ${pxToRem(80)};
  width: 100%;
`;

interface UploadFormProps {
  isVisible: boolean;
  className?: string;
}

const uploadName = 'upload_character_code';

export const CharacterCodeForm: React.FC<UploadFormProps> = ({
  isVisible,
  className,
}) => {
  const { setValue } = useForm();
  if (!isVisible) {
    return null;
  }

  return (
    <FormWrapper alignItems="flex-end" className={className} column gap={8}>
      <Label label="Character Code" labelFor={uploadName}>
        <CCInput name={uploadName} />
      </Label>
      <TextButton label="Use Code" type="submit" />
    </FormWrapper>
  );
};
