import Conversation from './Conversation';
import './chatbar.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { getAllConversationsThunk } from '../../../store/chatBarSlice';
import { useSelector } from 'react-redux';
import {
  conversationSelectors,
  isLoginSelector,
} from '../../../store/selectors';
import { ConversationI } from '../../../store/type';
import { userIdSelector } from '../../../store/selectors';
import { getUserInfoThunk } from '../../../store/authSlice';

interface Props {}

const ChatBar = ({}: Props) => {
  const currentUserId = useSelector(userIdSelector)!;
  const isLogin = useSelector(isLoginSelector);
  const dispatch = useAppDispatch();
  const conSelector = useSelector(conversationSelectors);
  const [conversations, setConversations] = useState<ConversationI[]>([]);

  useEffect(() => {
    if (isLogin) dispatch(getUserInfoThunk({ id: currentUserId }));
  }, [isLogin]);

  useEffect(() => {
    setConversations([...conSelector]);
  }, [conSelector]);

  useEffect(() => {
    if (isLogin) {
      dispatch(getAllConversationsThunk());
    }
  }, [isLogin]);

  return (
    <div className='chatbar'>
      {conversations.map((con) => (
        <Conversation
          key={con._id}
          name={
            con.receiverId._id === currentUserId
              ? con.senderId.email
              : con.receiverId.email
          }
          img={con.image}
          conversation={con}
        />
      ))}
    </div>
  );
};

export default ChatBar;
