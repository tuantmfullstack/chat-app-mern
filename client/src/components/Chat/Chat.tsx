import { useEffect } from 'react';
import { io } from 'socket.io-client';
import './Chat.scss';
import ChatBar from './ChatBar/ChatBar';
import ChatBody from './ChatBody/ChatBody';
import ChatFooter from './ChatFooter/ChatFooter';
import ChatUser from './ChatUser/ChatUser';
import { useSelector } from 'react-redux';
import { conversationSelector, userIdSelector } from '../../store/selectors';

interface Props {}

export const socket = io('http://localhost:3000');

const Chat = ({}: Props) => {
  const conSelector = useSelector(conversationSelector);
  const currentUserId = useSelector(userIdSelector)!;

  useEffect(() => {
    socket.emit('sendUser', currentUserId);
  }, []);

  useEffect(() => {
    socket.on('getUsers', (data) => {});
  }, []);

  return (
    <div className='chat'>
      <ChatBar />
      <div className='chat__wrapper'>
        {conSelector ? (
          <>
            <ChatBody />
            <ChatFooter />
          </>
        ) : (
          <div className='choose__conversation__wrapper'>
            <div className='choose__conversation'>
              Select conversation on the left to start a conversation
            </div>
          </div>
        )}
      </div>
      <div className='chat__user'>
        <ChatUser />
      </div>
    </div>
  );
};

export default Chat;
