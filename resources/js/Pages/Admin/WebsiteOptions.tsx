import CoordinatesInformation from '@/Components/WebsiteOptionsPartials/CoordinatesInformation'
import AdminDashboardTemplate from './AdminDashboardTemplate'
import BusinessInformation from '@/Components/WebsiteOptionsPartials/BusinessInformation'
import AdminManager from '@/Components/WebsiteOptionsPartials/AdminManager'

const WebsiteOptions = ({auth, webSettings, users}: any) => {

  return (
    <AdminDashboardTemplate headerText='Website options' auth={auth}>
      <div className='flex flex-col space-y-10'>
        <BusinessInformation webSettings={webSettings}/>
        <CoordinatesInformation webSettings={webSettings}/>
        <AdminManager webSettings={webSettings} users={users}/>
      </div>
    </AdminDashboardTemplate>
  )
}

export default WebsiteOptions