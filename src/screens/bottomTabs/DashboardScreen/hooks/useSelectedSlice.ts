import { useRef } from 'react';

import { useReactiveVar } from '@apollo/client';

import { selectedSliceVar } from 'api/client/cache';
import { SelectedSlicesKeysValue } from 'models/SelectedSlice';

function useSelectedSlice(initialState?: SelectedSlicesKeysValue) {
  // on first render set initial state for var
  const initialized = useRef(false);
  if (!initialized.current && initialState) {
    initialized.current = true;
    selectedSliceVar(initialState);
  }

  const selectedSlice = useReactiveVar(selectedSliceVar);
  const setSelectedSlice = (input) =>
    typeof input === 'function'
      ? selectedSliceVar(input(selectedSlice)) // Pass previous state in if a callback is used as the input
      : selectedSliceVar(input);

  return [selectedSlice, setSelectedSlice];
}

export default useSelectedSlice;
