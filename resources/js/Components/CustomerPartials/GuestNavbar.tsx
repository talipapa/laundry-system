import CanvasRestriction from '../CanvasRestriction'
import { Link, router } from '@inertiajs/react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/shadcn/ui/navigation-menu"
import { FaUser } from "react-icons/fa";
import { Separator } from "@/shadcn/ui/separator"
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { HiOutlineBellAlert } from "react-icons/hi2";


const GuestNavbar = ({webInfo, auth, currentTransaction}: any) => {
  return (
        <div className='sticky top-0 z-[100]'>
            {/* Notification navbar */}
            {/* <div className={`w-full h-[60px] bg-[rgb(249,132,74)]`}>
                <CanvasRestriction className="flex flex-col items-center justify-center">
                    <span className='font-semibold text-xl select-none'>FIRST OPENING 60% OFF 🎉🎉🎉</span>
                </CanvasRestriction>
            </div> */}

            {/* Navbar */}
            <div className={`w-full h-[90px] bg-[#131313]`}>
                <CanvasRestriction className="flex flex-row items-center justify-between">
                    <h1 className='text-[#F9844A] text-xl font-semibold'>{webInfo['websiteName']}</h1>
                    
                    <div className='flex flex-row space-x-6'>
                        <Link href='/' className="text-white hover:text-[#F9844A]">Home</Link>
                        {currentTransaction === null ? (
                            <Link href='/services' className="text-white hover:text-[#F9844A]">Services</Link>
                        ) : null}
                        <Link href='/services' className="text-white hover:text-[#F9844A]">About us</Link>
                        <Link href='/services' className="text-white hover:text-[#F9844A]">Contact us</Link>
                    </div>
                    {auth.user === null ? (
                        <div className='flex flex-row space-x-6'>
                            <Link href={route('login')} className="text-white hover:text-[#F9844A]">Login</Link>
                            <Link href={route('register')} className="text-white hover:text-[#F9844A]">Register</Link>
                        </div>
                    ) : (
                        <NavigationMenu className='flex flex-row space-x-2'>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                <NavigationMenuTrigger  className='text-white'>
                                    <div className='flex flex-row space-x-2 items-center'>
                                        <FaUser/>
                                        <span>{`${auth.user['first_name']} ${auth.user['last_name']}`}</span>
                                    </div>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className='w-[330px] flex flex-col'>
                                        {auth.currentTransaction !== null ? (
                                            <>
                                                <button type='button' onClick={() => router.get(route('customer.reservation'))} className='p-5 select-none cursor-pointer flex flex-row space-x-8 items-center hover:bg-slate-100'>
                                                    <HiOutlineBellAlert className='text-4xl text-green-600'/>
                                                    <span className='font-medium'>
                                                        You currently have active reservation
                                                    </span>
                                                </button>
                                                <Separator/>
                                            </>
                                        ) : null}
                                        <div className='px-5 pt-3 pb-5'>
                                            <div className='flex flex-col space-y-3'>
                                                <div className='text-md font-semibold mb-2'>
                                                    Welcome back <span className='text-[#F9844A] capitalize'>{`${auth.user['first_name']} ${auth.user['last_name']}`}</span>
                                                </div>
                                                {auth.user?.role !== 'customer' ? (
                                                    <>
                                                        <Link href={route('dashboard')} className="text-black hover:text-[#F9844A]  flex flex-row items-center space-x-6">
                                                            <IoNewspaperOutline  className='text-[30px]'/>
                                                            <span>
                                                                Admin dashboard
                                                            </span>
                                                        </Link>    
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link href={route('customer.account')} className="text-black hover:text-[#F9844A]  flex flex-row items-center space-x-6">
                                                            <MdOutlineManageAccounts className='text-[30px]'/>
                                                            <span>
                                                                Account
                                                            </span>
                                                        </Link>
                                                        <Link href={route('customer.reservation')} className="text-black hover:text-[#F9844A]  flex flex-row items-center space-x-6">
                                                            <IoNewspaperOutline  className='text-[30px]'/>
                                                            <span>
                                                                Transactions
                                                            </span>
                                                        </Link>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                        <Separator/>
                                        <div className='px-5 pt-3 pb-5 flex items-end justify-end'>
                                            <button type='button' onClick={() => router.post(route('logout'))} className='hover:text-[#F9844A] rounded-md select-none cursor-pointer'>
                                                <div className='flex flex-row space-x-2 items-center'>
                                                    <RiLogoutBoxFill className='text-3xl text-red-600'/>
                                                    <span className='font-semibold'>Logout</span>
                                                </div>
                                            </button>

                                        </div>

                                    </div>
                                </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                            

                        </NavigationMenu>

                    )}

                    
                    
                </CanvasRestriction>
            </div>
        </div>
  )
}

export default GuestNavbar