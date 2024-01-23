
import AdminDashboardTemplate from './AdminDashboardTemplate'
import DataTable from '@/Components/DataTable'
import { User } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/shadcn/ui/checkbox'

import { format } from 'date-fns'


import AdminCustomerActions from '@/Components/AdminPartials/AdminCustomerActions'
import { Button } from '@/shadcn/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    size: 10,
    header: ({ table }) => (
      // Checkbox should be wrapped inside a flex to avoid padding or margin bug.
      <div className='flex px-4'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox className='flex justify-center items-center'
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )},
    size: 20
  },
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )},
  },
  {
    accessorKey: "first_name",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fname
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )},
  },
  {
    accessorKey: "last_name",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lname
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )},
  },
  {
    accessorKey: "created_at",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
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
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      return <div className='flex flex-col items-start'>
        <div>
          {format(row.getValue("updated_at"), 'MMM dd yyyy')}
        </div>
        <div className='bg-green-400 dark:bg-green-900 rounded-lg px-1'>
          {format(row.getValue("updated_at"), 'hh:mm aa')}
        </div>
      </div>
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: AdminCustomerActions
  },
]

const customColumnVisiblity = {
  'created_at': false,
  'updated_at': false
}

const Customer = ({customers, auth}: any) => {


  return (
    <AdminDashboardTemplate headerText='Customer' auth={auth}>

        <DataTable columns={columns} data={customers} customColumnVisiblity={customColumnVisiblity} />
        
    </AdminDashboardTemplate>
  )
}

export default Customer