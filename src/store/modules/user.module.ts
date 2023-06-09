import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Draft } from "immer";
import { getUserInfo } from "@/service/user";

// createAsyncThunk会提供一个thunk对象，可以使用它的dispatch方法将请求的结果转发给其他的reducer处理
export const userInfoAsync = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    const response = await getUserInfo();
    return response.data;
  }
);

export interface IUser {
  userId: string;
  userName: string;
  email: string;
  userToken: string;
  loading: boolean;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: (): IUser => ({
    userId: '',
    userName: '',
    email: '',
    userToken: '',
    loading: false
  }),
  reducers: {

    setUserInfo: (state: Draft<IUser>, action) => {
      return Object.assign({}, state, { ...action.payload }) as IUser;
    },

    resetToken: (state: Draft<IUser>) => {
      state.userToken = '';
    },

  },
  // 在extraReducers中可以对请求结果的成功失败，做不同的处理
  extraReducers: (builder) => {
    // builder
    //   .addCase(userInfoAsync.pending, (state) => {
    //     // state.status = 'loading';
    //   })
    //   .addCase(userInfoAsync.fulfilled, (state, action) => {
    //     // state.status = 'idle';
    //     // state.value += action.payload;
    //   });
  }
});

export const { setUserInfo, resetToken } = userSlice.actions;

export const userReducer = userSlice.reducer;
