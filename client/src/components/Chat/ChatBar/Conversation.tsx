import './conversation.scss';
import { useAppDispatch } from '../../../store/store';
import chatBarSlice from '../../../store/chatBarSlice';
import { ConversationI } from '../../../store/type';

interface Props {
  name: string;
  img: string;
  conversation: ConversationI;
}

const Conversation = ({ name, img, conversation }: Props) => {
  const dispatch = useAppDispatch();
  const conversationHandler = () => {
    dispatch(chatBarSlice.actions.changeConversation(conversation));
  };

  const defaultImg =
    'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/messages_2022_standard_logo_512px_1.max-600x600.png';
  return (
    <div className='conversation' onClick={conversationHandler}>
      <img src={img || defaultImg} />
      <div className='convesation__name'>{name}</div>
    </div>
  );
};

export default Conversation;
