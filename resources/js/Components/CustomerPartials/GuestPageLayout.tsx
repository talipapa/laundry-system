import React from 'react'

type Props = {}

const GuestPageLayout = ({children}: any) => {
  return (
    <div className='xl:min-h-[100vh] flex flex-col justify-between'>
        {children}
    </div>
  )
}

export default GuestPageLayout