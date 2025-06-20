import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Dashboard({children}) {
  return (
    <div>
      <UserButton></UserButton>
    </div>
  )
}

export default Dashboard
