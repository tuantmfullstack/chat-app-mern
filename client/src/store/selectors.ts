import { RootState } from './store';

export const isLoginSelector = (state: RootState) => state.authSlice.isLogin;
export const conversationSelectors = (state: RootState) =>
  state.chatBarSlice.conversations;
export const messagesSelector = (state: RootState) =>
  state.chatBodySlice.messages;
export const conversationSelector = (state: RootState) =>
  state.chatBarSlice.conversation;
export const userIdSelector = (state: RootState) => state.authSlice.id;
export const userSelector = (state: RootState) => state.authSlice.user;
export const isContinueSelector = (state: RootState) =>
  state.chatBodySlice.isContinue;
export const userSelectors = (state: RootState) => state.chatBarSlice.users;
