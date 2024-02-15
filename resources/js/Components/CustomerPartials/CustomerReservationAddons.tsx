import React from 'react'

type Props = {}

const CustomerReservationAddons = ({row, table, column, getValue}: any) => {
  const transactions = JSON.parse(getValue())
  return (
    <ul>
        {transactions.map((addon: string, index: number) => (
        <li key={index} className='flex flex-col items-start '>
            <div className='text-[0.8rem] pb-1'>{addon}</div>
        </li>
        ))}
    </ul>
  )
}

export default CustomerReservationAddons