interface Props {
  time: Date;
}

const NoMessage = ({ time }: Props) => {
  return (
    <div className='no__conversation'>
      <div>{`Conversation created at: ${new Date(time).toLocaleTimeString(
        'vn-VN',
        {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }
      )}`}</div>
      <div>{`No message found, say hello to your friend?`}</div>
    </div>
  );
};

export default NoMessage;
