import React from 'react'
import CanvasRestriction from '../CanvasRestriction'
import { Link } from '@inertiajs/react'

type Props = {}

const GuestNavbar = ({webInfo}: any) => {
  return (
        <div className='sticky top-0 z-[100]'>
            {/* Notification navbar */}
            <div className={`w-full h-[60px] bg-[rgb(249,132,74)]`}>
                <CanvasRestriction className="flex flex-col items-center justify-center">
                    <span className='font-semibold text-xl select-none'>FIRST OPENING 60% OFF 🎉🎉🎉</span>
                </CanvasRestriction>
            </div>

            {/* Navbar */}
            <div className={`w-full h-[90px] bg-[#131313]`}>
                <CanvasRestriction className="flex flex-row items-center justify-between">
                    <h1 className='text-[#F9844A] text-xl font-semibold'>{webInfo['websiteName']}</h1>
                    
                    <div className='flex flex-row space-x-6'>
                        <Link href='/' className="text-white hover:text-[#F9844A]">Home</Link>
                        <Link href='/services' className="text-white hover:text-[#F9844A]">Services</Link>
                        <Link href='/services' className="text-white hover:text-[#F9844A]">About us</Link>
                        <Link href='/services' className="text-white hover:text-[#F9844A]">Contact us</Link>

                    </div>


                    <div className='flex flex-row space-x-6'>
                        <Link href={route('login')} className="text-white hover:text-[#F9844A]">Login</Link>
                        <Link href={route('register')} className="text-white hover:text-[#F9844A]">Register</Link>
                    </div>
                    
                    
                    

                </CanvasRestriction>
            </div>
        </div>
  )
}

export default GuestNavbar