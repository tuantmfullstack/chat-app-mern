import { useAppDispatch } from '../../../store/store';
import { getOrCreateConversationThunk } from '../../../store/chatBarSlice';
import {
  conversationSelector,
  messagesSelector,
} from '../../../store/selectors';
import { useSelector } from 'react-redux';
import chatBodySlice from '../../../store/chatBodySlice';

interface Props {
  _id: string;
  avatar: string;
  name: string;
  email: string;
}

const Person = ({ _id, avatar, name, email }: Props) => {
  const dispatch = useAppDispatch();
  const conSelector = useSelector(conversationSelector);
  const messages = useSelector(messagesSelector);

  // console.log({ conSelector, messages });

  const userSelectHandler = () => {
    if (conSelector?._id !== _id) {
      console.log(1);
      dispatch(chatBodySlice.actions.resetMessages());
      dispatch(getOrCreateConversationThunk({ receiverId: _id }));
    }
  };

  return (
    <div className='chatbar__users__wrapper' onClick={userSelectHandler}>
      <img src={avatar} alt='' />
      <div>{name}</div>
    </div>
  );
};

export default Person;
