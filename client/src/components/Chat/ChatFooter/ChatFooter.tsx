import './chatFooter.scss';
import { useSelector } from 'react-redux';
import { conversationSelector, userIdSelector } from '../../../store/selectors';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ConversationI, MessageClient } from '../../../store/type';
import { useAppDispatch } from '../../../store/store';
import { createMessage } from '../../../store/chatFooterSlice';
import { socket } from '../Chat';
import Picker from '@emoji-mart/react';
import { ThumbsUp } from 'react-feather';
import data from '@emoji-mart/data';

interface Props {}

const ChatFooter = ({}: Props) => {
  const [conversation, setConversation] = useState<ConversationI>();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const conSelector = useSelector(conversationSelector);
  const currentUserId = useSelector(userIdSelector)!;
  const dispatch = useAppDispatch();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (conSelector) {
      setConversation({ ...conSelector });
    }
  }, [conSelector]);

  const sendMessageHandler = (e: FormEvent) => {
    e.preventDefault();
    const message: MessageClient = {
      text: input,
      conversationId: conversation!._id!,
      senderId: currentUserId!,
    };

    dispatch(createMessage(message));

    const msg = {
      ...message,
      _id: Math.random().toString(),
      createdAt: new Date(Date.now()),
      receiverId:
        conversation?.senderId._id === currentUserId
          ? conversation?.receiverId._id
          : conversation?.senderId._id,
    };
    socket.emit('sendMessage', msg);

    setInput('');
  };

  const showPickerHandler = () => {
    setShow((prev) => !prev);
  };

  return (
    <form className='chatFooter' onSubmit={sendMessageHandler}>
      <input
        placeholder='Type something...'
        onChange={inputChangeHandler}
        value={input}
      />
      <div className='emoji__picker' onClick={showPickerHandler}>
        <ThumbsUp fill='yellow' strokeWidth={2} />
        {show && <Picker data={data} className='picker' />}
      </div>
      <button className='btn send__btn'>Send</button>
    </form>
  );
};

export default ChatFooter;
