import Link from 'next/link'
import React from 'react'

const IssuePage = () => {
  return (
    <div>
      <h1>Issue Page</h1>
      <Link href="issues/new" className='btn btn-primary mt-5'>Create new issue</Link>
    </div>
  )
}

export default IssuePage
