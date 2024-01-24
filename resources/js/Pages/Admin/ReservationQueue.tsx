import React from 'react'
import AdminDashboardTemplate from './AdminDashboardTemplate'
import { format, formatDistance } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { Order } from '@/types'
import DataTable from '@/Components/DataTable'
import { Button } from '@/shadcn/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import AdminReservationStatus from '@/Components/AdminPartials/AdminReservationStatus'
import AdminReservationAddons from '@/Components/AdminPartials/AdminReservationAddons'

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
    accessorKey: "total_price",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className='px-4'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )},
      cell: ({ row }) => {
        return (
          <div className='flex flex-col items-start text-[0.8rem]'>
              {`₱ ${row.original.total_price}`}
          </div>
        )
      }

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
    cell: AdminReservationStatus
  },
  {
    accessorKey: "service_type",
    header: ({column}) => {
      return (
        <div className='relative'>
        <Button
          variant="ghost"
          className='px-4 '
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Service Type
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )}, 
    cell: ({ row, getValue }) => {
      return (
        <div className='flex flex-col items-start text-[0.8rem]'>
            {row.original.service_type}
        </div>
      )
    }
  },
  {
    accessorKey: "addons",
    header: ({column}) => {
      return (
        <div className='relative'>
        <Button
          variant="ghost"
          className='px-4'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Add ons
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )}, 
    cell: AdminReservationAddons
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
          Reservation ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )},
    size: 1,
    cell: ({ row, getValue }) => {
      return (
        <div className='flex flex-col items-start text-[0.7rem]'>
            {row.original.id}
        </div>
      )
    }
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
  const [data, setData] = React.useState(currentOrders)
  return (
    <AdminDashboardTemplate headerText="Reservation" auth={auth}>
        <DataTable columns={columns} data={data} customColumnVisiblity={customColumnVisiblity}/>
    </AdminDashboardTemplate>
  )
}

export default ReservationQueue