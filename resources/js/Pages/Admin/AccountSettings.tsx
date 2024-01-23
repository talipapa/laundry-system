import React from 'react'
import AdminDashboardTemplate from './AdminDashboardTemplate'

type Props = {}

const AccountSettings = ({auth}: any) => {
  return (
    <AdminDashboardTemplate headerText='Account Settings' auth={auth}>
        Account settings content
    </AdminDashboardTemplate>
  )
}

export default AccountSettings