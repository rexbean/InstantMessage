export const Conversation_VM = 'ConversationScreenVM';
export const ConversationScreenVM = {
  name: Conversation_VM,
  state: {
    conversations: []
  },
  reducers: {
    addConversations(state, { conversations }) {
      const newConversations = [...conversations, ...state.conversations];
      return { ...state, conversations: newConversations };
    },
  },
  effects: {}
};
