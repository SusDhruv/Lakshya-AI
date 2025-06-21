"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(jobPosition, jobDescription, yearsOfExperience);
    const prompt = ` help me create a job interview for a job position ${jobPosition} with a job description ${jobDescription} and years of experience ${yearsOfExperience} give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} questions along with anwers in JSON format. Give us Question and Answer field on JSON`

    const result = await chatSession.sendMessage(prompt);
    Console.log(result.response.text());
    
  }

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-2xl  text-center">Add New</h2>
      </div>
      <Dialog open={openDialog}>
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
                    <label
                      className="text-black
                    "
                    >
                      Job Position/role
                    </label>
                    <Input placeholder="Ex. Software Engineer" required onChange={(e) => setJobPosition(e.target.value)}></Input>
                  </div>

                  <div className="my-3">
                    <label
                      className="text-black
                    "
                    >
                      Job Description/Tech Stack
                    </label>
                    <Textarea
                      placeholder="Ex. React, Node.js, and MongoDB."
                      required onChange={(e) => setJobDescription(e.target.value)}
                    ></Textarea>
                  </div>

                  <div className="my-3">
                    <label
                      className="text-black
                    "
                    >
                      Years of Experience
                    </label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      required
                      max={50}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div className="flex justify-end gap-5">
                  <Button
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Start Interview</Button>
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