export const Navigator_VM = 'NavigatorScreenVM';
export const NavigatorScreenVM = {
  name: Navigator_VM,
  state: {
    isActive: false,
  },
  reducers: {
    changeActive(state, { isActive }) {
      return { ...state, isActive };
    },
  },
  effects: {}
};
