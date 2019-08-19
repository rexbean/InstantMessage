export const PhotoPicker_VM = 'PhotoPickerScreenVM';
export const PhotoPickerScreenVM = {
  name: PhotoPicker_VM,
  state: {
    numOfChecked: 0,
    checked: {},
  },
  reducers: {
    onCheck(state, { checked }) {
      const newStatus = !state.checked[checked];
      let newNumOfChecked = 0;
      if (newStatus) {
        newNumOfChecked = state.numOfChecked + 1;
      } else {
        newNumOfChecked = state.numOfChecked - 1;
      }
      const newChecked = Object.assign({}, state.checked, { [checked]: newStatus });
      return { ...state, numOfChecked: newNumOfChecked, checked: newChecked };
    },
  },
  effects: {}
};
