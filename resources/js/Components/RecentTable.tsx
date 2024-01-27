import { Button } from '@/shadcn/ui/button'
import { Input } from '@/shadcn/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shadcn/ui/table'
import { Toaster } from '@/shadcn/ui/toaster'
import { useToast } from '@/shadcn/ui/use-toast'
import { router } from '@inertiajs/react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { ColumnDef, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const RecentTable = <Tdata, TValue>({columns, data, customColumnVisiblity}: DataTableProps<Tdata, TValue> & {customColumnVisiblity: any}) => {

    const [sorting, setSorting] = React.useState<SortingState>([{
        id: 'updated_at',
        desc: true
      }])
    const [filtering, setFiltering] = React.useState<any>('')
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(customColumnVisiblity)
    const [rowSelection, setRowSelection] = React.useState({})
  
    const {toast} = useToast()
    const table = useReactTable({
      data,
      columns,
      onGlobalFilterChange: setFiltering,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      columnResizeMode: "onChange",
      columnResizeDirection: "ltr",
      state: {
        sorting,
        globalFilter: filtering,
        columnVisibility,
        rowSelection,
      },
      meta: {
        updateRole: (rowIndex:any, userId: any, columnId: any, value: any) => {
          const payload = {
            id: userId,
            role: value
          }
          router.put(route('admin.customer.role'), payload, {
            preserveState: true,
            onSuccess: () => {
              toast({title: 'Successfully saved', variant: 'success'})
              
            },
            onError: (e) => {
              toast({title: 'Successfully saved', description: 'Something went wrong', variant: 'destructive'})
              router.reload()
            }

          })
        },
        updateStatus: (rowIndex:any, transactionId: any, columnId: any, value: any) => {
          const payload = {
            id: transactionId,
            status: value
          }
          router.put(route('admin.transaction.status'), payload, {
            onSuccess: () => {
              router.reload()
              toast({title: 'Successfully saved', variant: 'success'})
              
            },
            onError: () => {
              toast({title: 'Successfully saved', description: 'Something went wrong', variant: 'destructive'})
              router.reload()
            }

          })
        }
      }
      
    })


    return (
      
        <div className="w-full">
          <div className="flex items-center justify-between">
          </div>
          <Table className='bg-[#ffffff] dark:bg-[#2e2c2c] shadow-xl'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='px-6'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Toaster />
        </div>
      )
}

export default RecentTable