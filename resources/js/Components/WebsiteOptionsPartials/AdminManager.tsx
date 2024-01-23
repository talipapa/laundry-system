import React from 'react'
import DataTable from '@/Components/DataTable'
import { User } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/shadcn/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu'
import { Button } from '@/shadcn/ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { useToast } from "@/shadcn/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog"
import { Toaster } from '@/shadcn/ui/toaster'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog"
import { Label } from '@/shadcn/ui/label'
import { Input } from '@/shadcn/ui/input'
import { router } from '@inertiajs/react'
import SelectionRole from './Componenets/SelectionRole'
import AdminCustomerActions from '../AdminPartials/AdminCustomerActions'

export const columns: ColumnDef<User>[] = [
    {
      id: "select",
      size: 50,
      header: ({ table }) => (
        // Checkbox should be wrapped inside a flex to avoid padding or margin bug.
        <div className='flex'>
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
      header: "ID",
      size: 1,
    },
    {
      accessorKey: "email",
      size: -100,
      header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        size: 1,
        cell: SelectionRole
    },
    {
      accessorKey: "first_name",
      header: "Fname",
    },
    {
      accessorKey: "last_name",
      header: "Lname",
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
    'updated_at': false,
    'first_name': false,
    'last_name': false
  }

const AdminManager = ({users}: any) => {
  return (
    <div className="w-full bg-white  dark:bg-[#2E2C2C] rounded-md p-6 dark:text-white">

    <DataTable columns={columns} data={users} customColumnVisiblity={customColumnVisiblity} />

    </div>
  )
}

export default AdminManager