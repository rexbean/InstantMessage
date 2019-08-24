export const Chat_VM = 'ChatScreenVM';
export const ChatScreenVM = {
  name: Chat_VM,
  state: {
    message: null,
    messageSet: [],
    show: false,
    content: '',
  },
  reducers: {
    clearMessage(state) {
      const newMessageSet = [];
      return { ...state, messageSet: newMessageSet };
    },
    changeMessage(state, { message }) {
      return { ...state, message };
    },
    addMessage(state, { message }) {
      const newState = Object.assign({}, state, { messageSet: [...state.messageSet,message] });
      return newState;
    },
    setShow(state, { show }) {
      return { ...state, show };
    },
    setContent(state, { content }) {
      return { ...state, content };
    },
  },
  effects: {}
};
