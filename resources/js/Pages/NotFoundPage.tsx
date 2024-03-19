import CanvasRestriction from '@/Components/CanvasRestriction'
import { Head } from '@inertiajs/react'
import React from 'react'

type Props = {}

const NotFoundPage = ({isLoggedIn}: any) => {
  return (
    
    <div className='w-full h-full py-12 flex flex-col items-center space-y-24 '>
    <Head title="404 | Not Found" />

    {/* Main content container */}
        <CanvasRestriction>
            <div className='flex flex-col items-center space-y-4'>
                <h1 className='text-4xl font-bold'>404</h1>
                <p className='text-lg text-center'>The page you are looking for does not exist.</p>
            </div>
        </CanvasRestriction>
    </div>
  )
}

export default NotFoundPage