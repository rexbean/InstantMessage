export const Login_VM = 'LoginScreenVM';
export const LoginScreenVM = {
  name: Login_VM,
  state: {
    username: null,
    password: null,
    sb: null,
    user: null,
  },
  reducers: {
    changeUsername(state, { username }) {
      return { ...state, username };
    },
    changePassword(state, { password }) {
      return { ...state, password };
    },
    setSb(state, { sb }) {
      return { ...state, sb };
    },
    setUser(state, { user }) {
      return { ...state, user };
    }
  },
  effects: {}
};
