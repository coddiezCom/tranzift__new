import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  email_id: "",
  token: "",
  firstName: "",
  lastName: "",
  phone: "",
  isEmailVerified:false,
  defaultAddress: "",
};

export const UserDetail = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    SetUserDetail(state, action) {
      state.user_id = action.payload.user_id;
      state.email_id = action.payload.email_id;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.defaultAddress = action.payload.defaultAddress;
    },
  },
});

export const { SetUserDetail } = UserDetail.actions;

export default UserDetail.reducer;
