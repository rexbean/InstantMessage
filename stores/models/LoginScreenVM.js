export const Login_VM = 'LoginScreenVM';
export const LoginScreenVM = {
  name: Login_VM,
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
