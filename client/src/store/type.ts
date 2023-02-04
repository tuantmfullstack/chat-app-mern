export interface ConversationI {
  _id: string;
  name: string;
  image: string;
  senderId: { _id: string; email: string };
  receiverId: { _id: string; email: string };
  createdAt: Date;
}

export interface MessageI {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId?: string;
  text: string;
  createdAt: Date;
}

export interface MessageClient {
  conversationId: string;
  senderId: string;
  text: string;
}

export interface UserI {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
}

export interface authState {
  name: string | undefined | null;
  // avatar:string
  id: string | null;
  isLogin: boolean;
  user: UserI | null;
}

export interface AuthUserI {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface ChatBarStateI {
  isLoading: boolean | null;
  conversations: ConversationI[];
  conversation: ConversationI | null;
  err: boolean | null;
}

export interface ChatBodyStateI {
  isLoading: boolean | null;
  messages: MessageI[];
  err: boolean | null;
}

export interface ChatFooterStateI {
  isLoading: boolean | null;
  message: MessageI | null;
  err: boolean | null;
}
