import React, { useState } from 'react';
import { useCandidateUserQuery, useEmployerQuesionMutation, useUserReplyMutation } from '../../feature/Job/jobApi';
import { useNavigate, useParams } from 'react-router-dom';
import { BsArrowReturnRight, BsArrowRightShort } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const ApplyUser = () => {
  const { handleSubmit, register, reset } = useForm();
  const [reply, setReply] = useState("")
  const [postQuetion,{}]=useEmployerQuesionMutation()
  const [postReply, {}]=useUserReplyMutation()

 const {email} = useParams()
 const {user} = useSelector((state)=>state.auth)
 const navigate = useNavigate()
 const {data, isLoading} = useCandidateUserQuery(email, {pollingInterval: 500})
 const {firstName, lastName, country, address, city, gender, postcode, employer, _id} = data?.data || {}
 console.log(_id)
 const handleQuesion = (data)=>{
  const quetion= {
    ...data,
    userId: user._id,
    candidateId:_id,
    email: user.email
  }
  postQuetion(quetion)
  console.log(quetion)
  reset()
}

const handleReply = (id)=>{
  const data = {
    reply,
    userId: id
  }
  postReply(data)
  console.log(data)
}



 return (
  <div className='mx-12'>
   <div className="overflow-x-auto">
  <table className="table w-11/12 text-center ">
    
    <thead>
      <tr >
        
        <th>Name</th>
        <th>Country</th>
        <th>City</th>
        <th>Address</th>
        <th>Gender</th>
        <th>PostCode</th>
        <th>Details</th>
      </tr>
    </thead>
   

    <tbody className='mt-20'>
     
      <tr>
        
        
      <td>{firstName},{lastName}</td>
        <td>{country}</td>
        <td>{city}</td>
        <td>{address}</td>
        <td>{gender}</td>
        <td>{postcode}</td>
        <td><button className='btn' onClick={()=> navigate(`/applyUser/${email}`)}>Details</button></td>
      </tr>
     
      
    </tbody>
     
  </table>
</div>
<div>
  <div className="divider bg-gray-500 mt-12 px-2 text-white text-center">Massage Option</div>
<div>
<div className='text-primary my-2'>
              {employer?.map(({ question, email, reply, id }) => (
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

            <div className='flex gap-3 my-5'>
            {user.role === "employer" &&
              <form action="" onSubmit={handleSubmit(handleQuesion)}>
              <input 
                 placeholder='Ask a question...'
                 type='text'
                 {...register("question")}
                 className='w-full'
               />
               <button 
                 className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                 type='submit'
               >
                 <BsArrowRightShort size={30} />
               </button>
              </form>
             }
            </div>
</div>
</div>
  
  </div>
 );
};

export default ApplyUser;