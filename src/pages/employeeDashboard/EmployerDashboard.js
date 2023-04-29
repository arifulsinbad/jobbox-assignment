import React from "react";
import { useSelector } from "react-redux";
import { useEmployerAddJobQuery } from "../../feature/Job/jobApi";
import JobCard from "../../components/reusable/JobCard";

const EmployerDashboard = () => {
  const {user:{email}} =useSelector((state)=>state.auth)
  const {data, isLoading, isError} = useEmployerAddJobQuery(email)
  return (
    <div className="grid grid-cols-2 w-11/12 mx-auto mt-5">
      {
        data?.data?.map((job)=><JobCard key={job._id} jobData={job}></JobCard>)
      }
      
    </div>
  );
};

export default EmployerDashboard;
