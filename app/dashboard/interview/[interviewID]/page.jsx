"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/utils/db";
import { Lakshya_Data } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";    
import { WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link";
function Interview() {
  const { interviewID } = useParams();    
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  useEffect(() => {
    console.log(interviewID);
    getInterviewData();
  }, []);

  const getInterviewData = async () => {
    const result = await db.select().from(Lakshya_Data).where(eq(Lakshya_Data.mockId, interviewID));
    console.log(result);
    setInterviewData(result[0]);
  }
      
  return (
    <div className="h-screen flex flex-col justify-center items-center p-2">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Let's Get Started</h2>
      
      <div className="flex flex-row items-start gap-8 w-full max-w-7xl">
        {/* Interview Details Section - Left Side */}
        <div className="flex-1 max-w-md flex flex-col justify-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Interview Details</h3>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg border border-blue-100 p-4 space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Position</span>
                <p className="text-sm text-gray-900 font-medium mt-1">{interviewData?.jobPoistion}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tech Stack</span>
                <p className="text-sm text-gray-900 font-medium mt-1">{interviewData?.jobDesc}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Years Of Experience</span>
                <p className="text-sm text-gray-900 font-medium mt-1">{interviewData?.jobExperience} years</p>
              </div>
            </div>
          </div>
          
          {/* Interview Instructions Alert */}
          <Alert className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <AlertTitle className="text-blue-600 text-base">Interview Instructions</AlertTitle>
            <AlertDescription className="text-gray-700 text-sm">
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Welcome to your interview! Please ensure your webcam and microphone are working properly.</li>
                <li>You will be asked questions based on your job position.</li>
                <li>Speak clearly and take your time to answer each question thoroughly.</li>
                <li>Make sure you are in a quiet environment with good lighting.</li>
                <li>Have your resume and any relevant documents ready for reference.</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        {/* Webcam Section - Right Side */}
        <div className="flex-shrink-0 ml-auto flex flex-col justify-start">
          {webcamEnabled ? (
            <Webcam
              onUserMedia={()=>setWebcamEnabled(true)}
              onUserMediaError={()=>setWebcamEnabled(false)}
              mirrored={true}
              style={{
                height: '450px',
                width: '450px',
                minHeight: '450px',
                minWidth: '450px',
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-[450px] h-[450px] p-8 bg-black rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                <WebcamIcon className="w-32 h-32 text-gray-400"/>
              </div>
              <div className="flex gap-3 mt-3">
                <Button 
                  onClick={()=>setWebcamEnabled(true)} 
                  className="text-sm px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-lg transition-all duration-200 font-medium"
                >
                  Enable Webcam and Microphone
                </Button>
                <Link href ={`/dashboard/interview/${interviewID}/start`}>
                <Button className="text-sm px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-lg transition-all duration-200 font-medium" >Start Interview</Button>
                </Link>
              </div>
            </div>  
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
