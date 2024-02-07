import React from 'react'

const AdminReservationAddons = ({row, table, column, getValue}: any) => {
    const keys = Object.keys(getValue())
    
  return (
    <ul>
        {keys.map((addon, index) => (
        <li key={index} className='flex flex-col items-start '>
            <div className='text-[0.8rem] pb-1'>{getValue()[addon]}</div>
        </li>
        ))}
    </ul>
  )
}

export default AdminReservationAddons