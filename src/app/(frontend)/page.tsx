import type { NextPage } from 'next'
import config from '@payload-config'
import { getPayload } from 'payload'

import React from 'react'

const Page: NextPage = async () => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
  })

  console.log(result)

  return (
    <div>
      <h1>Hello, Next.js 15!</h1>
      <div>
        {result.docs.map((item, index) => {
          return <span key={index}>{item.title}</span>
        })}
      </div>
    </div>
  )
}

export default Page
