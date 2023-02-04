import { format } from 'timeago.js';
import './message.scss';
import { userIdSelector } from '../../../store/selectors';
import { useSelector } from 'react-redux';

interface Props {
  senderId: string;
  text: string;
  createdAt: Date;
}

const Message = ({ senderId, text, createdAt }: Props) => {
  const currentUserId = useSelector(userIdSelector)!;

  return (
    <div
      className={`message ${senderId === currentUserId ? '' : 'your__message'}`}
    >
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU'
        alt=''
      />
      <div className='message__wrapper'>
        <div className='message__text'>{text}</div>
        <div className='message__time'>{format(createdAt)}</div>
      </div>
    </div>
  );
};

export default Message;
