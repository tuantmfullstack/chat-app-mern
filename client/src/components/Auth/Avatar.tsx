import { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors';
import { useAppDispatch } from '../../store/store';
import { updateAvatarThunk } from '../../store/authSlice';
import { UserI } from '../../store/type';
interface Props {}

const url =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU';
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dfa7qyx7z/image/upload';

const Avatar = ({}: Props) => {
  const currentUser = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<File>();
  const [imgUrl, setImgUrl] = useState('');
  const [user, setUser] = useState<UserI>();

  const fileChangeHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files![0];
    setImg(file);
    setImgUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setImgUrl(currentUser.avatar);
    }
  }, [currentUser]);

  useEffect(() => {
    if (img) {
      (async () => {
        const formData = new FormData();
        formData.append('file', img!);
        formData.append('upload_preset', 'pveahlup');

        const { data } = await axios.post(cloudinaryUrl, formData);
        setImgUrl(data.url);
        dispatch(updateAvatarThunk({ id: user?._id, avatar: data.url }));
      })();
    }
  }, [img]);

  return (
    <form className='info__img__wrapper' encType='multipart/form-data'>
      <img className='info__img' src={imgUrl} alt='' />
      <input id='file' type={'file'} onChange={fileChangeHandler} />
      <label htmlFor='file' className='file__label'>
        Upload file
      </label>
    </form>
  );
};

export default Avatar;
