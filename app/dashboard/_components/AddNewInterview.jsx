"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lakshya_Data } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import moment from "moment";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [jsonResponse, setJsonResponse] = useState([]);
  const {user} = useUser();
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobPosition,
          jobDescription,
          yearsOfExperience,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.questions) {
        console.log(data.questions);
        setJsonResponse(data.questions);
        const resp = await db.insert(Lakshya_Data).values({
          mockId: crypto.randomUUID(),
          jsonMockResponse: JSON.stringify(data.questions),
          jobPoistion: jobPosition,
          jobDesc: jobDescription,
          jobExperience: yearsOfExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        }).returning({mockId:Lakshya_Data.mockId});
        console.log("Inserted Id",resp);
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
        // Reset form
        setJobPosition("");
        setJobDescription("");
        setYearsOfExperience("");
      } else {
        setError(data.error || "Failed to generate questions");
        console.error("Error:", data.error);
        if (data.rawResponse) {
          console.log("Raw response:", data.rawResponse);
        }
      }
    } catch (error) {
      setError("Network error: " + error.message);
      console.error("Error generating interview questions:", error);
    } finally {

      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError("");
    setJobPosition("");
    setJobDescription("");
    setYearsOfExperience("");
  };

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center w-full max-w-xs mx-auto p-8 border border-gray-200 rounded-xl bg-white shadow-sm transition-all duration-200 cursor-pointer hover:shadow-lg hover:bg-gray-50 group"
        onClick={() => setOpenDialog(true)}
      >
        <span className="flex items-center gap-2 text-lg text-gray-700 group-hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New
        </span>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className="text-gray-500">
                    Add details about the job position/role, Job Description and
                    years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="text-black">Job Position/role</label>
                    <Input
                      placeholder="Ex. Software Engineer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label className="text-black">Job Description/Tech Stack</label>
                    <Textarea
                      placeholder="Ex. React, Node.js, and MongoDB."
                      required
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label className="text-black">Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      required
                      max={50}
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Error Display */}
                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                
                <div className="flex justify-end gap-5">
                  <Button
                    variant="ghost"
                    onClick={handleCloseDialog}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Start Interview"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
