import React, { useState } from "react";
import { useGetChases, useGethistory } from "../reactQuery/queries/queries"; // Using your existing query
import PrimaryButton from "./PrimaryButton";
import Input from "./ui/Input";
import Text from "./ui/Text";
import Loading from "./Loading"; // Assuming you have a loading component
import { useSelector } from "react-redux";

const JobSelectorModal = ({ isOpen, onClose, onSelect }) => {
//   const { data, isLoading, isError } = useGetChases();
  const userId = useSelector((state) => state.session.userId);
 const { data, isLoading ,isError} = useGethistory(userId?.telegramId);
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  // Handle data structure (safety check if data is an array or an object with a 'chases' property)
  const jobs = Array.isArray(data) ? data : data?.history || [];

  console.log("Jobs data in JobSelectorModal:", jobs); // Debug log

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.chaseId?.toLowerCase().includes(term) ||
      job.customerName?.toLowerCase().includes(term) ||
      job.jobDescription?.toLowerCase().includes(term) &&
      job.status==="scheduled"
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-hidden m-4">
        
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <Text variant="h3" className="font-semibold text-gray-800">Select a Job</Text>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-white border-b">
          <Input 
            placeholder="Search by Job ID, Customer, or Description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {isLoading ? (
            <div className="flex justify-center p-8"><Loading /></div>
          ) : isError ? (
            <div className="text-red-500 text-center">Failed to load jobs. Please try again.</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-gray-500 text-center p-8">No jobs found matching your search.</div>
          ) : (
            <div className="grid gap-3">
              {filteredJobs.map((job) => (
                <div 
                  key={job._id || job.chaseId} 
                  className="bg-white p-4 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all flex justify-between items-center group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">
                        {job._id}
                      </span>
                      <span className="font-semibold text-gray-800">{job.customerName || "Unknown Customer"}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate max-w-md">{job.jobDescription || "No description"}</p>
                    {job.address && <p className="text-xs text-gray-500 mt-1">{job.address}</p>}
                  </div>
                  
                  <PrimaryButton 
                    className="ml-4 shrink-0"
                    onClick={() => onSelect(job)}
                    style={{width:"60px"}}
                  >
                    Select
                  </PrimaryButton>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSelectorModal;