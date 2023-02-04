import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesThunk } from '../../../store/chatBodySlice';
import {
  conversationSelector,
  isContinueSelector,
  isLoginSelector,
  messagesSelector,
} from '../../../store/selectors';
import { useAppDispatch } from '../../../store/store';
import { ConversationI, General, MessageI } from '../../../store/type';
import { socket } from '../Chat';
import './chatBody.scss';
import Message from './Message';
import Spinner from './Spinner';
import chatBodySlice from '../../../store/chatBodySlice';

let num = 0;

interface Props {}

const ChatBody = ({}: Props) => {
  const isLogin = useSelector(isLoginSelector);
  const dispatch = useAppDispatch();
  const conSelector = useSelector(conversationSelector);
  const messSelector = useSelector(messagesSelector);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [conversation, setConversation] = useState<ConversationI>();
  const [messages, setMessages] = useState<General[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<MessageI>();
  const isContinue = useSelector(isContinueSelector);

  useEffect(() => {
    if (messSelector) setMessages([...messSelector]);
  }, [messSelector]);

  useEffect(() => {
    if (conSelector !== null) {
      setConversation({ ...conSelector! });
      num = 0;
    }
  }, [conSelector]);

  useEffect(() => {
    if (
      arrivalMessage?.conversationId &&
      conversation?._id &&
      arrivalMessage.conversationId === conversation._id
    ) {
      dispatch(chatBodySlice.actions.addingMessage(arrivalMessage));
    }
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries: any) => {
        if (entries[0].isIntersecting && conversation && isContinue) {
          dispatch(
            getMessagesThunk({ conversationId: conversation._id, skip: num })
          );
          num += 10;
        }
      },
      { threshold: 1 }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, [num, conversation]);

  useEffect(() => {
    socket.on('getMessage', (message: MessageI) => {
      setArrivalMessage(message);
    });
  }, []);

  return (
    <div className='chatBody'>
      {messages?.map((messageWrapper) => (
        <div key={messageWrapper.id} className='reverse'>
          {messageWrapper?.data?.map((message) => (
            <Message
              key={message._id}
              senderId={message.senderId}
              text={message.text}
              createdAt={message.createdAt}
            />
          ))}
        </div>
      ))}
      <button ref={buttonRef}>{isContinue ? <Spinner /> : ''}</button>
    </div>
  );
};

export default ChatBody;
