export const Chat_VM = 'ChatScreenVM';
export const ChatScreenVM = {
  name: Chat_VM,
  state: {
    receiver: '',
    message: null,
    messageSet: [],
    appKey: 'b6e4c6e373e10a6afd7e2ac6',
    show: false,
    content: '',
  },
  reducers: {
    changeMessage(state, { message }) {
      return { ...state, message };
    },
    addMessage(state, { message }) {
      const newState = Object.assign({}, state, { messageSet: [...state.messageSet, message] });
      return newState;
    },
    setReceiver(state, { receiver }) {
      return { ...state, receiver };
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
