export const Contact_VM = 'ContactScreenVM';
export const ContactScreenVM = {
  name: Contact_VM,
  state: {
    numberOfInvitations: 0,
    invitations: [],
    invitationSet: new Set(),
  },
  reducers: {
    receiveInvitation(state, { invitation }) {
      const username = invitation;
      if (state.invitationSet.has(username)) {
        return state;
      }
      const newInvitations = [...state.invitations, username];
      const newInvitationSet = new Set(state.invitationSet);
      newInvitationSet.add(username);
      return {
        numberOfInvitations: state.numberOfInvitations + 1,
        invitations: newInvitations,
        invitationSet: newInvitationSet,
      };
    },
    changeInvitation(state, { invitation }) {
      const username = invitation;
      if (state.invitationSet.has(username)) {
        state.invitationSet.delete(username);
        const newInvitationSet = new Set(state.invitationSet);
        const newInvitations = [...state.invitations];
        const index = newInvitations.indexOf(invitation);
        if (index > -1) {
          newInvitations.splice(index, 1);
        }
        return {
          numberOfInvitations: state.numberOfInvitations - 1,
          invitationSet: newInvitationSet,
          invitations: newInvitations,
        };
      }
      return state;
    },
  },
  effects: {}
};
