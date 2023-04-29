import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.config";
import { jobData, setUser, toggleLoading, userData } from "./feature/auth/authSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch =useDispatch()
  const {user, isLoading}=useSelector((state)=>state.auth)
  console.log(isLoading)
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      console.log(user)
      if(user){
        dispatch(userData(user.email))
        dispatch(jobData(user.email))
      }else{
        dispatch(toggleLoading())
      }
    })
  },[dispatch])
  return (
    <>
    <Toaster/>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
