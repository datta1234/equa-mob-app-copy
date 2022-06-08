import { Dispatch, SetStateAction, useState } from 'react';

type Prop = boolean | string | number;

/**
 *  toggles a value between boolean states or sets toggle to a specific state. i.e toggleValue to true or toggleValue to false
 * @param defaultValue starting toggle value. If undefined then false
 */

export default function useToggle(
  defaultValue: Prop,
): [boolean, (value: boolean) => void] {
  const [value, setValue] = useState(!!defaultValue);

  function toggleValue(toggleValueTo: boolean) {
    return setValue((currentValue) =>
      typeof toggleValueTo === 'boolean' ? toggleValueTo : !currentValue,
    );
  }

  return [value, toggleValue];
}
