import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Applicants from "./Applicants";

const CandidateDashboard = () => {
const {jobData} = useSelector((state)=>state.auth)
// const {applicants} = jobData
console.log(jobData)
  return (
    <div>
      {jobData.length &&
        jobData.map((job)=><Applicants key={job._id} jobData={job} ></Applicants>)
      }
    </div>
  );
};

export default CandidateDashboard;
