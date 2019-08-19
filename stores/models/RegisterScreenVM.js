
export const Register_VM = 'RegisterScreenVM';
export const RegisterScreenVM = {
  name: Register_VM,
  state: {
    username: null,
    password: null,
  },
  reducers: {
    changeUsername(state, { username }) {
      return { ...state, username };
    },
    changePassword(state, { password }) {
      return { ...state, password };
    },
  },
  effects: {}
};
