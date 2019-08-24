import { Alert } from 'react-native';
export const Conversation_VM = 'ConversationScreenVM';
export const ConversationScreenVM = {
  name: Conversation_VM,
  state: {
    conversations: [],
    numOfUnReads: 0,
  },
  reducers: {
    addConversations(state, { conversations }) {
      const newConversations = [];
      let numOfUnReads = 0;
      conversations.forEach(conversation => {
        newConversations.push(conversation);
        numOfUnReads += conversation.unreadMessagesCount;
      });
      return { ...state, conversations: newConversations, numOfUnReads };
    },
    increaseNumOfUnread(state, { unreadCount }) {
      return { ...state, numOfUnReads: state.numOfUnReads + unreadCount };
    },
    decreaseNumOfUnread(state, { unreadCount }) {
      return { ...state, numOfUnReads: state.numOfUnReads - unreadCount };
    },
  },
  effects: {}
};
