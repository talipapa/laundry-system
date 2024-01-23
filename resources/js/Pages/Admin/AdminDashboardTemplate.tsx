import AdminNavbar from '@/Components/AdminPartials/AdminNavbar'
import AdminSidebar from '@/Components/AdminPartials/AdminSidebar'
import { Head } from '@inertiajs/react'
import React from 'react'

type Props = {}

const AdminDashboardTemplate = ({children, auth, headerText}: any) => {
  return (
    <>
    <Head title={headerText} />
    <div className='flex flex-row h-screen w-screen overflow-hidden'>
        <AdminSidebar/>
        <div className='bg-[#F5F5F5] dark:bg-[#232323] w-full overflow-y-scroll'>
            <AdminNavbar headerText={headerText} auth={auth}/>
            <div className='px-10 mt-4'>
                {children}
            </div>
        </div>
    </div>
</>
  )
}

export default AdminDashboardTemplate