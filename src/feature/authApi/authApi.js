import apiSlice from "../apiSlice/apiSlice";
import { getUser } from "../auth/authSlice";

const authApi = apiSlice.injectEndpoints({
 endpoints:(builder)=>({
  register:builder.mutation({
   query:(data)=>({
    url:"/user",
    method:"POST",
    body:data
   }),
   async onQueryStarted(data, {dispatch, queryFulfilled}){
    try{
const res = await queryFulfilled;
dispatch(getUser(data.email))
    }catch(e){
//
    }
   }

  })
 })
});
 export const {useRegisterMutation} = authApi;
