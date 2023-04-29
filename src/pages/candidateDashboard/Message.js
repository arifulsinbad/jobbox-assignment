import React, { useState } from 'react';
import { BsArrowReturnRight, BsArrowRightShort } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useUserReplyMutation } from '../../feature/Job/jobApi';

const Message = () => {
 const [reply, setReply] = useState("")
 const [postReply, {}]=useUserReplyMutation()


 const handleReply = (id)=>{
  const data = {
    reply,
    userId: id
  }
  postReply(data)
  console.log(data)
}
 const {user}= useSelector((state)=>state.auth)
 return (
  <div className='mx-12'>
   <div className='text-primary my-2'>
              {user?.employer?.map(({ question, email, reply, id }) => (
                <div>
                  <small>{email}</small>
                  <p className='text-lg font-medium'>{question}</p>
                  {reply?.map((item) => (
                    <p className='flex items-center gap-2 relative left-5'>
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  <div className='flex gap-3 my-5'>
                  {user.role === "candidate" && <form action="">
                    <input placeholder='Reply' onBlur={(e)=>setReply(e.target.value)} type='text' className='w-full' />
                    <button onClick={()=>handleReply(id)}
                      className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                      type='button'
                    >
                      <BsArrowRightShort size={30} />
                    </button>
                    </form>}
                  </div>
                </div>
              ))}
            </div>

  </div>
 );
};

export default Message;