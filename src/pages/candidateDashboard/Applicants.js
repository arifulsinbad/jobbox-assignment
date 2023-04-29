import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Applicants = ({jobData}) => {
 const {applicants} = jobData
 const navigate = useNavigate()
console.log(applicants)

 return (
  <div>
        <div className="overflow-x-auto">
  <table className="table w-11/12 text-center ">
    
    <thead>
      <tr >
        
        <th>Number</th>
        <th>Email</th>
        <th>Details</th>
      </tr>
    </thead>
   {
   applicants.map(({email},i)=>(

    <tbody className='mt-20'>
     
      <tr>
        
        <td>{i=i+1}</td>
        <td>{email}</td>
        <td><button className='btn' onClick={()=> navigate(`/dashboard/applyUser/${email}`)}>Details Chat</button></td>
      </tr>
     
      
    </tbody>
     ))
    }
  </table>
</div>
  
  </div>
 );
};

export default Applicants;