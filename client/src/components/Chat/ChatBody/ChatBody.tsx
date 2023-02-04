import Message from './Message';
import './chatBody.scss';
import chatBodySlice from '../../../store/chatBodySlice';
import { socket } from '../Chat';
import {
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
  isLoginSelector,
  conversationSelector,
} from '../../../store/selectors';
import { useAppDispatch } from '../../../store/store';
import { getMessagesThunk } from '../../../store/chatBodySlice';
import { ConversationI, MessageI } from '../../../store/type';
import { messagesSelector } from '../../../store/selectors';
import './chatBody.scss';

interface Props {}

const ChatBody = ({}: Props) => {
  const isLogin = useSelector(isLoginSelector);
  const dispatch = useAppDispatch();
  const conSelector = useSelector(conversationSelector);
  const messSelector = useSelector(messagesSelector);
  const [conversation, setConversation] = useState<ConversationI>();
  const [messages, setMessages] = useState<MessageI[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<MessageI>();
  // const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messSelector) setMessages([...messSelector]);
  }, [messSelector]);

  useEffect(() => {
    if (conSelector !== null) {
      setConversation({ ...conSelector! });
    }
  }, [conSelector]);

  useEffect(() => {
    if (isLogin && conversation) {
      dispatch(getMessagesThunk(conversation!._id));
    }
  }, [isLogin, conversation]);

  // useEffect(() => {
  //   // endRef.current!.scrollIntoView({ behavior: 'smooth' });
  //   endRef.current!.scrollIntoView();
  // }, [messages]);

  useEffect(() => {
    if (
      arrivalMessage?.conversationId &&
      conversation?._id &&
      arrivalMessage.conversationId === conversation._id
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    socket.on('getMessage', (message: MessageI) => {
      setArrivalMessage(message);
    });
  }, []);

  return (
    <div className='chatBody'>
      {messages.map((message) => (
        <Message
          key={message._id}
          senderId={message.senderId}
          text={message.text}
          createdAt={message.createdAt}
        />
      ))}
      <button>See more</button>
      {/* <div className='endRef' ref={endRef} /> */}
    </div>
  );
};

export default ChatBody;
