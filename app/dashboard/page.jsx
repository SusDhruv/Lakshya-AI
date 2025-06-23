import { UserButton } from '@clerk/nextjs'
import AddNewInterview from './_components/AddNewInterview'
import React from 'react'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start your Mock AI Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      <h3 className='text-xl font-semibold mt-8 mb-2'>Previous Interviews</h3>
      <InterviewList/>
    </div>
  )
}

export default Dashboard
