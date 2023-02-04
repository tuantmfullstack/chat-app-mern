import { AxiosResponse } from 'axios';
const handleThunk = async (
  fn: Promise<AxiosResponse>,
  rejectWithValue: Function
) => {
  try {
    const { data } = await fn;

    // console.log({ data });

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
};

export default handleThunk;
