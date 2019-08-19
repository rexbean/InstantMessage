export const NewContact_VM = 'NewContactScreenVM';
export const NewContactScreenVM = {
  name: NewContact_VM,
  state: {
    username: null,
  },
  reducers: {
    changeUsername(state, { username }) {
      return { ...state, username };
    },
  },
  effects: {}
};
