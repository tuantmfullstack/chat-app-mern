import './conversation.scss';
import { useAppDispatch } from '../../../store/store';
import chatBarSlice from '../../../store/chatBarSlice';
import { ConversationI } from '../../../store/type';
import chatBodySlice from '../../../store/chatBodySlice';
import { useSelector } from 'react-redux';
import { userIdSelector } from '../../../store/selectors';
import { useRef } from 'react';

interface Props {
  name: string;
  img: string;
  conversation: ConversationI;
}

const Conversation = ({ name, img, conversation }: Props) => {
  const dispatch = useAppDispatch();
  const currentUserId = useSelector(userIdSelector);
  const isOwner = conversation?.senderId?._id === currentUserId;

  const conversationHandler = () => {
    dispatch(chatBodySlice.actions.resetMessages());
    dispatch(chatBarSlice.actions.changeConversation(conversation));
  };

  return (
    <div className='conversation' onClick={conversationHandler}>
      <img
        src={
          isOwner
            ? conversation.receiverId.avatar
            : conversation.senderId.avatar
        }
      />
      <div className='convesation__name'>
        {isOwner ? conversation.receiverId.name : conversation.senderId.name}
      </div>
    </div>
  );
};

export default Conversation;
