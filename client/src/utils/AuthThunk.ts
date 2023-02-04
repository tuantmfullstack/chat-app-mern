import { AxiosResponse } from 'axios';
import authSlice from '../store/authSlice';
import { toast } from 'react-toastify';

interface PropI {
  fn: Promise<AxiosResponse>;
  rejectWithValue: Function;
  navigate?: Function;
  dispatch?: Function;
}

const authThunk = async ({
  fn,
  rejectWithValue,
  navigate,
  dispatch,
}: PropI) => {
  try {
    const { data } = await fn;
    const message = data.message;

    toast.success(message, {
      autoClose: 3000,
    });

    setTimeout(() => {
      if (navigate) navigate('/');
    }, 3000);

    if (dispatch)
      dispatch(
        authSlice.actions.authFulfilled({ token: data.token, user: data.user })
      );

    return data;
  } catch (error: any) {
    let messages =
      error.response.data.error.errors || error.response.data.message;
    if (typeof messages === 'object') {
      messages = Object.keys(messages)
        .map((e: any) => messages[e].message)
        .join(', ');
    }
    toast.error(messages, {
      autoClose: 7000,
    });
    return rejectWithValue(error);
  }
};

export default authThunk;
