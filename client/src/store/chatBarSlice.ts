import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../utils/axiosConfig';
import handleThunk from '../utils/HandleThunk';
import { ChatBarStateI } from './type';
import chatBodySlice from './chatBodySlice';

const initialState: ChatBarStateI = {
  isLoading: false,
  isConversationCreated: false,
  conversations: [],
  conversation: null,
  users: [],
  err: false,
};

export const getAllConversationsThunk = createAsyncThunk(
  'getAllConversationsThunk',
  (_, { rejectWithValue }) => {
    const fn = instance.get('conversations');
    return handleThunk(fn, rejectWithValue);
  }
);

export const getAllUsersThunk = createAsyncThunk(
  'getAllUsersThunk',
  (_, { rejectWithValue }) => {
    const fn = instance.get('users');
    return handleThunk(fn, rejectWithValue);
  }
);

export const getOrCreateConversationThunk = createAsyncThunk(
  'getOrCreateConversationThunk',
  ({ receiverId }: { receiverId: string }, { rejectWithValue, dispatch }) => {
    const fn = instance.patch('conversations', { receiverId });
    const data = handleThunk(fn, rejectWithValue);

    data.then((data) => {
      if (data.isCreated) {
        dispatch(chatBodySlice.actions.resetMessages());
        dispatch(chatBarSlice.actions.addNewConversation(data.conversation));
      }
    });

    return data;
  }
);

const chatBarSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeConversation: (state, { payload }) => {
      state.conversation = payload;
    },
    addNewConversation: (state, { payload }) => {
      state.conversations.push(payload);
    },
  },
  extraReducers: {
    [getAllConversationsThunk.pending.type]: (state, { payload }) => {
      state.isLoading = true;
      state.err = false;
    },
    [getAllConversationsThunk.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.err = false;
      state.conversations = payload.conversations;
    },
    [getAllConversationsThunk.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [getAllUsersThunk.pending.type]: (state, { payload }) => {
      state.isLoading = true;
      state.err = false;
    },
    [getAllUsersThunk.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.err = false;
      state.users = payload.users;
    },
    [getAllUsersThunk.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [getOrCreateConversationThunk.pending.type]: (state, { payload }) => {
      state.isLoading = true;
      state.err = false;
    },
    [getOrCreateConversationThunk.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.err = false;
      state.isConversationCreated = payload.isCreated;
      state.conversation = payload.conversation;
    },
    [getOrCreateConversationThunk.rejected.type]: (state) => {
      state.isLoading = false;
      state.conversation = null;
      state.isConversationCreated = false;
      state.err = true;
    },
  },
});

export default chatBarSlice;
