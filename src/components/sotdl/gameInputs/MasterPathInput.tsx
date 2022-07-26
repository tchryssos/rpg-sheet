import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/sotdl/form';

import { TextInput } from '../../form/TextInput';

// const otherOption = {
//   label: '-- Other --',
//   value: 'other-ignore',
//   disabled: true,
// };

// const masterPathOptions = [
//   ...masterPathSelectOptions,
//   otherOption,
//   { label: startCase(SECOND_EXPERT_PATH), value: SECOND_EXPERT_PATH },
// ];

// const secondExpertPathOptions = [
//   ...expertPathSelectOptions,
//   otherOption,
//   {
//     label: startCase(FIELD_NAMES.paths.master_path),
//     value: FIELD_NAMES.paths.master_path,
//   },
// ];

export const MasterPathInput = () => {
  const { watch } = useFormContext();

  const level: number = watch(FIELD_NAMES.level, 0);

  const isMaster = level >= 7;

  /*
    This used to be some cool logic that would switch between
    Second expert path and master path select options
    but I've decided to go with a text input for simplicity sake
    however, I am leaving it here in case I ever decide to go back to that
    system
  */

  // useEffect(() => {
  //   if (masterPath === SECOND_EXPERT_PATH) {
  //     setOptions(secondExpertPathOptions);
  //     setIsSecondExpertPath(true);
  //     setValue(FIELD_NAMES.paths.master_path, expertPathSelectOptions[1]);
  //   } else if (masterPath === FIELD_NAMES.paths.master_path) {
  //     setOptions(masterPathOptions);
  //     setValue(FIELD_NAMES.paths.master_path, masterPathSelectOptions[1]);
  //     setIsSecondExpertPath(false);
  //   }
  // }, [masterPath, setValue]);

  // useEffect(() => {
  //   if (!isMaster) {
  //     setOptions(disabledOptions);
  //     setValue(FIELD_NAMES.paths.master_path, '');
  //   } else {
  //     setOptions(masterPathOptions);
  //   }
  // }, [isMaster, setValue]);

  return (
    <TextInput disabled={!isMaster} name={FIELD_NAMES.paths.master_path} />
  );
};
