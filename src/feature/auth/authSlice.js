import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import auth from "../../firebase/firebase.config"
const initialState = {
 user : {email: "", role:""},
 isLoading: true,
 isError: false,
 error: "",
 jobData:{},
}
export const createAccount = createAsyncThunk("auth/createAccount", async ({email, password})=>{
 const data = await createUserWithEmailAndPassword(auth, email, password)
 // console.log(data)
 return data.user.email;
})
export const createLoging = createAsyncThunk("auth/createLoging", async ({email, password})=>{
 const data = await signInWithEmailAndPassword(auth, email, password)
 // console.log(data)
 return data.user.email;
})
export const getUser = createAsyncThunk("auth/getUser", async (email)=>{
 const data = await signInWithEmailAndPassword()
 // console.log(data)
 return data.user.email;
})
export const signGoogle = createAsyncThunk("auth/signGoogle", async ()=>{
 const Provider = new GoogleAuthProvider()
 const data = await signInWithPopup(auth, Provider)
 // console.log(data)
 return data.user.email;
})
export const userData = createAsyncThunk("auth/userData", async (email)=>{
 
 const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`)
 // console.log(data)
 const data = await res.json()
 if(data.status){

  return data;
 }
 return email;
})
export const jobData = createAsyncThunk("auth/jobData", async (email)=>{
 
 const res = await fetch(`${process.env.REACT_APP_DEV_URL}/job/${email}`)
 // console.log(data)
 const data = await res.json()
 if(data.status){

  return data;
 }
 
})

const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers:{
  setUser: (state, {payload})=>{
   state.user.email = payload
  },
  toggleLoading: (state)=>{
   state.isLoading = false;
  },
  logOut: (state)=>{
state.user.email = "";
  },
  applyUser:(state, {payload})=>{
    
  }
 },
 extraReducers:(builder)=>{
builder.addCase(createAccount.pending, (state)=>{
 state.isLoading = true;
 state.isError = false;
 state.error = "";
}).addCase(createAccount.fulfilled, (state, {payload})=>{
 state.isLoading = false;
 state.user.email = payload
 state.isError = false;
 state.error = "";
}).addCase(createAccount.rejected, (state, action)=>{
 state.isLoading = false;
 state.user.email = "";

 state.isError = true;
 state.error = action.error.message;
})
.addCase(createLoging.pending, (state)=>{
 state.isLoading = true;
 state.isError = false;
 state.error = "";
}).addCase(createLoging.fulfilled, (state, {payload})=>{
 state.isLoading = false;
 state.user.email = payload
 state.isError = false;
 state.error = "";
}).addCase(createLoging.rejected, (state, action)=>{
 state.isLoading = false;
 state.user.email = "";

 state.isError = true;
 state.error = action.error.message;
})
.addCase(signGoogle.pending, (state)=>{
 state.isLoading = true;
 state.isError = false;
 state.error = "";
}).addCase(signGoogle.fulfilled, (state, {payload})=>{
 state.isLoading = false;
 state.user.email = payload
 state.isError = false;
 state.error = "";
}).addCase(signGoogle.rejected, (state, action)=>{
 state.isLoading = false;
 state.user.email = "";

 state.isError = true;
 state.error = action.error.message;
})
.addCase(userData.pending, (state)=>{
 state.isLoading = true;
 state.isError = false;
 state.error = "";
}).addCase(userData.fulfilled, (state, {payload})=>{
 state.isLoading = false;
 if(payload.status){

  state.user = payload.data
 }else{
  state.user.email = payload
 }
 state.isError = false;
 state.error = "";
}).addCase(userData.rejected, (state, action)=>{
 state.isLoading = false;
 state.user.email = "";

 state.isError = true;
 state.error = action.error.message;
})
.addCase(jobData.pending, (state)=>{
 state.isLoading = true;
 state.isError = false;
 state.error = "";
}).addCase(jobData.fulfilled, (state, {payload})=>{
 state.isLoading = false;
 if(payload.status){

  state.jobData = payload.data
 }
 state.isError = false;
 state.error = "";
}).addCase(jobData.rejected, (state, action)=>{
 state.isLoading = false;
 state.jobData = {};

 state.isError = true;
 state.error = action.error.message;
})
 }
})
export const {setUser, toggleLoading, logOut} = authSlice.actions
export default authSlice.reducer;