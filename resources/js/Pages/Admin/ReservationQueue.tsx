import React from 'react'
import AdminDashboardTemplate from './AdminDashboardTemplate'
import { Checkbox } from '@/shadcn/ui/checkbox'
import { format, formatDistance } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { Order } from '@/types'
import DataTable from '@/Components/DataTable'
import { Button } from '@/shadcn/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'

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
    size: 0,
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
    accessorKey: "id",
    header: ({column}) => {
      return (
        <div className='relative'>
        <Button
          variant="ghost"
          className='px-4'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
        </div>
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
    size: 1
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
    size: 200
  },
  {
    accessorKey: "created_at",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className='px-4'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )},
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

const ReservationQueue = ({auth, currentOrders}: any) => {
  const [isChecked, setIsChecked] = React.useState(false)
  return (
    <AdminDashboardTemplate headerText="Reservation" auth={auth}>
        <DataTable columns={columns} data={currentOrders} customColumnVisiblity={customColumnVisiblity}/>
    </AdminDashboardTemplate>
  )
}

export default ReservationQueue