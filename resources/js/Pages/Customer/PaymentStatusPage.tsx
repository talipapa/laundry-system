import React from 'react'
import CustomerDashboardTemplate from './CustomerDashboardTemplate'

type Props = {}

const PaymentStatusPage = ({intent_id, auth, webInfo, geoLocation}: any) => {
  return (
    <CustomerDashboardTemplate auth={auth} headerText="Dashboard" webInfo={webInfo} geoLocation={geoLocation} currentTransaction={auth?.currentTransaction}>
        {intent_id}
    </CustomerDashboardTemplate>
  )
}

export default PaymentStatusPage