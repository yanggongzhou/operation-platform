import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "@/store/modules/app.module";
import { IUser, userReducer } from "@/store/modules/user.module";
import { commonReducer, ICommon } from "@/store/modules/common.module";
import { IAppStore } from "@/store/store.interfaces";

export function makeStore() {
  return configureStore({
    reducer: {
      app: appReducer,
      user: userReducer,
      common: commonReducer
    }
  });
}
export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch & ThunkDispatch<{
  app: IAppStore,
  user: IUser,
  common: ICommon
}, undefined, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
  >

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
