// import { SelectedSlice } from 'src/models/SelectedSlice';
// import { ReactiveVar } from '@apollo/client';

export default (
  selectedSliceVar, //: ReactiveVar<SelectedSlice>
) => {
  return (
    filter,
    //: SelectedSlice
  ) => {
    selectedSliceVar(filter);
  };
};
