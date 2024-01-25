import React from 'react'
import AdminDashboardTemplate from './AdminDashboardTemplate'
import { PageProps } from '@/types'
import UpdateProfileInformationForm from '../Profile/Partials/UpdateProfileInformationForm'
import UpdatePasswordForm from '../Profile/Partials/UpdatePasswordForm'
import DeleteUserForm from '../Profile/Partials/DeleteUserForm'

type Props = {}

const AccountSettings = ({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string, success:any }>) => {
  
  return (
    <AdminDashboardTemplate headerText='Account Settings' auth={auth}>
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
    </AdminDashboardTemplate>
  )
}

export default AccountSettings