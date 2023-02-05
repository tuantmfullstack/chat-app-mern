import { useMemo, ChangeEvent } from 'react';
import './chatbar.scss';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/selectors';
import { useAppDispatch } from '../../../store/store';
import { useEffect } from 'react';
import { getAllUsersThunk } from '../../../store/chatBarSlice';
import Person from './Person';
import Select from 'react-select';
import { GroupBase, Options } from 'react-select';

interface Props {}

const FindingPerson = ({}: Props) => {
  const users = useSelector(userSelectors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  const options = users.map((user) => {
    return {
      value: user.email,
      label: (
        <Person
          _id={user._id}
          avatar={user.avatar}
          name={user.name}
          email={user.email}
        />
      ),
    };
  });

  return (
    <div className='chatbar__input__wrapper'>
      <Select options={options} />
    </div>
  );
};

export default FindingPerson;
