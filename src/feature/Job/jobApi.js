import apiSlice from "../apiSlice/apiSlice";

const jobApi = apiSlice.injectEndpoints({
 endpoints:(builder)=>({
  postJob:builder.mutation({
  query:(data)=>({
   url: "/job",
   method:"POST",
   body: data
  }), 
  invalidatesTags:["Jobs"]
  }),
  applyJob:builder.mutation({
  query:(data)=>({
   url: "/apply",
   method:"PATCH",
   body: data
  }) 
  }),
  applyQuesion : builder.mutation({
   query:(data)=>({
    url: "/query",
    method: "PATCH",
    body: data
   }),
   invalidatesTags: ["Job"]
  }),
  employerQuesion : builder.mutation({
   query:(data)=>({
    url: "/employer",
    method: "PATCH",
    body: data
   }),
   invalidatesTags: ["Job"]
  }),
  addJonDelete : builder.mutation({
   query:(id)=>({
    url: `/delete/${id}`,
    method: "DELETE",
    
   }),
   invalidatesTags: ["Job"]
  }),
  reply : builder.mutation({
   query:(data)=>({
    url: "/reply",
    method: "PATCH",
    body: data
   }),
invalidatesTags:["Job"]
  }),
  userReply : builder.mutation({
   query:(data)=>({
    url: "/userReply",
    method: "PATCH",
    body: data
   }),
invalidatesTags:["Job"]
  }),
  getJobs:builder.query({
  query:()=>({
   url: "/jobs",
   
  }),
// providesTags: ["Jobs"]
  }),
  getJobId:builder.query({
  query:(id)=>({
   url: `/job-details/${id}`,
   
  }),
  providesTags:["Job"]

  }),
 
  employerAddJob:builder.query({
  query:(email)=>({
   url: `/job/${email}`,
   
  }), 
  // providesTags:["Jobs"]
  }),
  appliedJob:builder.query({
  query:(email)=>({
   url: `applied-job/${email}`,
   
  }), 
  // providesTags:["Jobs"]
  }),
 
  candidateUser:builder.query({
  query:(email)=>({
   url: `/user/${email}`,
   
  }), 
  // providesTags:["Jobs"]
  })

 })
});
export const {usePostJobMutation,
 useApplyJobMutation,
  useGetJobIdQuery,
   useGetJobsQuery , 
   useAppliedJobQuery,
   useApplyQuesionMutation,
   useReplyMutation,
   useEmployerAddJobQuery,
   useAddJonDeleteMutation,
   useCandidateUserQuery,
   useUserReplyMutation,
   useEmployerQuesionMutation
   }= jobApi;