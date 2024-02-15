import AdminNavbar from '@/Components/AdminPartials/AdminNavbar'
import AdminSidebar from '@/Components/AdminPartials/AdminSidebar'
import { ThemeProvider } from '@/Components/theme-provider'
import { Head } from '@inertiajs/react'
import React from 'react'

type Props = {}

const AdminDashboardTemplate = ({children, auth, headerText}: any) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Head title={headerText} />
      <div className='flex flex-row h-screen w-screen overflow-hidden'>
          <AdminSidebar auth={auth}/>
          <div className='bg-[#dddddd] dark:bg-[#424141] w-full overflow-y-scroll'>
              <AdminNavbar headerText={headerText} auth={auth}/>
              <div className='px-10 mt-4'>
                  {children}
              </div>
          </div>
      </div>
    </ThemeProvider>
  )
}

export default AdminDashboardTemplate