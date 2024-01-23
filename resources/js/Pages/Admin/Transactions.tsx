import React from 'react'
import AdminDashboardTemplate from './AdminDashboardTemplate'
import { ColumnDef } from '@tanstack/react-table'
import { Order } from '@/types'
import { Checkbox } from '@/shadcn/ui/checkbox'
import { format, formatDistance } from 'date-fns'
import DataTable from '@/Components/DataTable'
import { Button } from '@/shadcn/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { availableStatus } from '@/Helpers/OrderStatus'
import { Select } from '@/shadcn/ui/select'

type Props = {}
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "updated_at",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className='px-4'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
    )},
    size: 20,
    cell: ({ row }) => {

      return <div className='flex flex-col items-start'>
        <div>
          {
            formatDistance(row.getValue("updated_at"), new Date(), { addSuffix: true })
          }
        </div>
      </div>
    },
  },
  {
    accessorKey: "status",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className='px-4'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )},
    cell: ({ row, getValue }) => {

      return <div className='flex flex-col items-start'>
      <div className={`${availableStatus[getValue() as keyof typeof availableStatus].color} text-black px-2 rounded-lg`}>
        {availableStatus[row.getValue("status") as keyof typeof availableStatus].text}
      </div>
    </div>
    }
  },
  {
    accessorKey: "id",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className='px-4'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )},
    size: 1
  },
  {
    accessorKey: "user_id",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className='px-4'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )},
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return <div className='flex flex-col items-start'>
        <div>
          {format(row.getValue("updated_at"), 'MMM dd yyyy')}
        </div>
        <div className='bg-green-400 dark:bg-green-900  rounded-sm px-1'>
          {format(row.getValue("updated_at"), 'hh:mm aa')}
        </div>
      </div>
    },
  },
]

const customColumnVisiblity = {
  'created_at': false,
}
const Transactions = ({auth, transactions}: any) => {

  return (
    <AdminDashboardTemplate headerText='Transaction' auth={auth}>
        <DataTable columns={columns} data={transactions} customColumnVisiblity={customColumnVisiblity}/>
    </AdminDashboardTemplate>
  )
}

export default Transactions