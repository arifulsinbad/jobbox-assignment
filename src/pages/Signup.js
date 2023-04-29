import React, { useEffect, useState } from "react";
import loginImage from "../assets/login.svg";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, signGoogle } from "../feature/auth/authSlice";
const Signup = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const {user:{email}, }= useSelector((state)=>state.auth)

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = ({email, password}) => {
dispatch(createAccount({email, password}))
    console.log(email);
  };
useEffect(()=>{
  if(email){
    navigate("/")
    return
  }
},[email, navigate])

const handleGoogle =()=>{
  dispatch(signGoogle())
}
  return (
    <div className='flex h-screen items-center pt-14'>
      <div className='w-1/2'>
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  {...register("email")}
                />
              </div>

              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='confirm-password' className='ml-5'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirm-password'
                  {...register("confirmPassword")}
                />
              </div>
              <div className='!mt-8 '>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
              <button onClick={handleGoogle}
                  type='button'
                  className='font-bold text-white py-3 rounded-full bg-slate-400 w-full'
                >
                  Google With Login Now
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
