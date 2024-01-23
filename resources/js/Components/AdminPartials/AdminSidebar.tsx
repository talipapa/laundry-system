import { applicationName } from '@/Helpers/GlobalDefinition'
import React from 'react'
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { PiNut } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import NavLink from '../NavLink';
import { router } from '@inertiajs/react';
import { GrUserAdmin } from "react-icons/gr";




const AdminNavbar = ({navBarHeight}: any) => {

  const logoutFunc = () => {
    router.post(route('logout'))
  }


  return (
    <div className='w-[350px] h-screen sticky top-0 left-0 bg-black text-[#F9844A] flex flex-col justify-between'>
      <div className='h-[85px] p-8 flex flex-row items-center text-lg'>
        <MdOutlineLocalLaundryService className='text-3xl me-1'/>
        {applicationName}
      </div>

      <div className='p-8 h-full flex flex-col space-y-2 text-[#ffffffaf]'>

        <NavLink 
        href={route('admin.dashboard')} 
        className={`hover:bg-[#ffffff1f] select-none px-3 py-3 rounded-sm flex flex-row items-center space-x-2 ${route().current('admin.dashboard') ? "bg-[#ffffff41]" : null}`}>
          <MdOutlineSpaceDashboard className='text-2xl text-[#4cc9f0]'/>
          <span className='text-[#ffffffc2]'>Dashboard</span>
        </NavLink>

        <NavLink 
        href={route('admin.reservation-queue')} 
        className={`hover:bg-[#ffffff1f] select-none px-3 py-3 rounded-sm flex flex-row items-center space-x-2 ${route().current('admin.reservation-queue') ? "bg-[#ffffff41]" : null}`}>
          <MdOutlineMiscellaneousServices className='text-2xl text-[#4cc9f0]'/>
          <span className='text-[#ffffffc2]'>Reservation Queue</span>
        </NavLink>


        <NavLink href={route('admin.customer')} className={`hover:bg-[#ffffff1f] select-none px-3 py-3 rounded-sm flex flex-row items-center space-x-2 ${route().current('admin.customer') ? "bg-[#ffffff41]" : null}`}>
          <IoPeopleOutline className='text-2xl text-[#4cc9f0]'/>
          <span className='text-[#ffffffc2]'>Customers</span>
        </NavLink>


        <NavLink 
        href={route('admin.transaction')} 
        className={`hover:bg-[#ffffff1f] select-none px-3 py-3 rounded-sm flex flex-row items-center space-x-2 ${route().current('admin.transaction') ? 'bg-[#ffffff41]' : null}`}>
          <LuNewspaper className='text-2xl text-[#4cc9f0]'/>
          <span className='text-[#ffffffc2]'>Transactions</span>
        </NavLink>
        
      </div>

      <div className='p-6'>
        <div className='p-2 border-t-2 border-slate-600 text-[#ffffffaf] flex flex-col space-y-2'>
          <NavLink href={route('admin.web-settings')} className={`hover:bg-[#ffffff1f] select-none px-3 py-2 rounded-sm flex flex-row items-center space-x-2 ${route().current('admin.web-settings') ? "bg-[#ffffff41]" : null}`}>
            <GrUserAdmin className='text-2xl text-[#4ccaf088]'/>
            <span className='text-[#ffffffc2]'>Web settings</span>
          </NavLink>
          <NavLink href={route('admin.account-settings')} className={`hover:bg-[#ffffff1f] select-none px-3 py-2 rounded-sm flex flex-row items-center space-x-2 ${route().current('admin.account-settings') ? "bg-[#ffffff41]" : null}`}>
            <PiNut className='text-2xl text-[#4ccaf088]'/>
            <span className='text-[#ffffffc2]'>Account settings</span>
          </NavLink>
          <div className='hover:bg-[#ffffff41] select-none px-3 py-2 rounded-sm flex flex-row items-center space-x-2' onClick={() => logoutFunc()}>
            <IoIosLogOut className='text-2xl text-[#ef476f]'/>
            <span className='text-[#ffffffc2]'>Logout</span>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminNavbar