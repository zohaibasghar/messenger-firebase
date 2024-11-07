import { createSlice } from "@reduxjs/toolkit";
import { IUserDTO } from "../../types";

interface StateDTO {
  user: IUserDTO | null;
}

const initialState: StateDTO = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { loginUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
