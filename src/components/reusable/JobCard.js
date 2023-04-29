import React from "react";
import { FaRemoveFormat, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddJonDeleteMutation } from "../../feature/Job/jobApi";
import { toast } from "react-hot-toast";

const JobCard = ({ jobData }) => {
  const navigate = useNavigate();
  const {user:{role}}=useSelector((state)=>state.auth)
  const [postDelete, {isSuccess}]=useAddJonDeleteMutation()
  const { _id, position, companyName, location, employmentType } =
    jobData || {};
const handleDelete = ()=>{

postDelete(_id)
}
if(isSuccess){
  toast.success("Add Job Post Delete")
  return
}
  return (
    <div
      key={_id}
      className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
    >
      <div className='flex justify-between  text-primary'>
{  role === "employer" &&
      <button onClick={handleDelete} className=" text-red-600">Add Job<FaTrash className="text-xl"></FaTrash></button>
}        <div>
          <p className='text-xl'>{position}</p>
          <small className='text-primary/70 '>
            by{" "}
            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <p>{employmentType}</p>
        <button className='btn' onClick={() => navigate(`/job-details/${_id}`)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
