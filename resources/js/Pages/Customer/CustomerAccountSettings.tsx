import React from 'react'
import UpdateProfileInformationForm from '../Profile/Partials/UpdateProfileInformationForm'
import UpdatePasswordForm from '../Profile/Partials/UpdatePasswordForm'
import { PageProps } from '@/types'
import CustomerDashboardTemplate from './CustomerDashboardTemplate'

type Props = {}

const CustomerAccountSettings = ({ auth, mustVerifyEmail, status, webInfo, geoLocation }: PageProps<{ mustVerifyEmail: boolean, status?: string, success:any }>) => {
  return (
    <CustomerDashboardTemplate auth={auth} headerText="Dashboard" webInfo={webInfo} geoLocation={geoLocation}>
      <div className="space-y-6 mb-4">
          <div className="p-4 sm:p-8 bg-white dark:bg-[#2E2C2C]  shadow sm:rounded-lg">
              <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                  className="max-w-xl dark:text-white"
              />
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-[#2E2C2C]  shadow sm:rounded-lg">
              <UpdatePasswordForm className="max-w-xl dark:text-white" />
          </div>
      </div>

    </CustomerDashboardTemplate>
  )
}

export default CustomerAccountSettings