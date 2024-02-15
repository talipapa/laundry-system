import CanvasRestriction from '@/Components/CanvasRestriction'
import GuestFootbar from '@/Components/CustomerPartials/GuestFootbar'
import GuestNavbar from '@/Components/CustomerPartials/GuestNavbar'
import GuestPageLayout from '@/Components/CustomerPartials/GuestPageLayout'
import { Head } from '@inertiajs/react'
type Props = {}

const CustomerDashboardTemplate = ({children, auth, headerText, webInfo, geoLocation}: any) => {
  return (
    <GuestPageLayout>
        <Head title={headerText} />
        {/* Header container */}
        <GuestNavbar webInfo={webInfo} auth={auth}/>

        <div className='w-full bg-[#EEEEEE] py-12 flex flex-col items-center space-y-24'>
            {/* Main content container */}
            <CanvasRestriction className='min-h-[800px]'>
                {children}
            </CanvasRestriction>
        </div>
        {/* Footer container */}
        <GuestFootbar webInfo={webInfo} geoLocation={geoLocation}/>

    </GuestPageLayout>
  )
}

export default CustomerDashboardTemplate