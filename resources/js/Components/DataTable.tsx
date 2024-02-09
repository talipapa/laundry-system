import React, { useEffect, useRef, useState } from 'react'
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  
  import { Button } from "@/shadcn/ui/button"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/shadcn/ui/dropdown-menu"
  import { Input } from "@/shadcn/ui/input"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/shadcn/ui/table"
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select'
import { router } from '@inertiajs/react'
import { useToast } from '@/shadcn/ui/use-toast'
import { Toaster } from '@/shadcn/ui/toaster'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

interface DataTableProps<TData, TValue> {
columns: ColumnDef<TData, TValue>[]
data: TData[]
}

 

const DataTable = <Tdata, TValue>({columns, data, customColumnVisiblity}: DataTableProps<Tdata, TValue> & {customColumnVisiblity: any}) => {

    const [sorting, setSorting] = React.useState<SortingState>([])
    // const [sorting, setSorting] = React.useState<SortingState>([{
    //   id: 'updated_at',
    //   desc: true
    // }])

    const [tempData, setTempData] = useState(data)

    useEffect(() => {
      setTempData(data)
    }, [data])


    const [filtering, setFiltering] = React.useState<any>('')
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(customColumnVisiblity)
    const [rowSelection, setRowSelection] = React.useState({})
  
    const {toast} = useToast()
    const table = useReactTable({
      data: tempData,
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
      initialState: {
        pagination: {
          pageSize: 8,
        },
        sorting: [
          {
            id: 'updated_at',
            desc: true
          }
        ]
      },
      state: {
        sorting,
        globalFilter: filtering,
        columnVisibility,
        rowSelection,
        
      },
      meta: {
        updateRole: (rowIndex:any, userId: any, columnId: any, value: any, ) => {
          const payload = {
            id: userId,
            role: value
          }
          router.put(route('admin.customer.role'), payload, {
            preserveState: true,
            onSuccess: () => {
              toast({title: 'Successfully saved', variant: 'success'})
              setTempData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex
                  ? {
                    ...prev[rowIndex],
                    [columnId]: value,
                  }
                  : row
                )
              ) 

       
              
    
            },
            onError: (e) => {
              toast({title: 'Successfully saved', description: 'Something went wrong', variant: 'destructive'})
              router.reload()
            }

          })
        },
        updateStatus: (rowIndex:any, transactionId: any, columnId: any, value: any, colorValue: any, originalValue: any) => {
          
          const payload = {
            id: transactionId,
            status: value
          }
          
          
          router.put(route('admin.transaction.status'), payload, {
            onSuccess: () => {
              toast({title: 'Successfully saved', variant: 'success'})
              setTempData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex
                  ? {
                    ...prev[rowIndex],
                    [columnId]: {name: value, foreground: colorValue},
                  }
                  : row
                )
              ) 
            },
            onError: () => {
              toast({title: 'Something went wrong', variant: 'destructive'})
            }

          })
        },
      }
      
    })


    const [inProp, setInProp] = useState(false)

    const nodeRef = useRef(null)



  

    return (
      
        <div className="w-full">

          <div className="flex items-center justify-between py-4 ">
            <Input
              placeholder="Search..."
              value={filtering}
              onChange={(event) => setFiltering(event.target.value)
              }
              className="max-w-sm shadow-sm bg-[#ffffff] dark:bg-[#0C0A09] "
            />
            <div className='flex flex-row items-center space-x-3 '>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-9 rounded-lg w-[100px] bg-[#ffffff] dark:bg-[#0C0A09] ">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[8, 15, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize} rows
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
                <TransitionGroup component={null}>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row, index) => (
                      <CSSTransition key={index} nodeRef={nodeRef} timeout={1000} classNames="rowItems">
                        <TableRow 
                        ref={nodeRef}
                        key={row.id}
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
                      </CSSTransition>
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
                </TransitionGroup>

              </TableBody>
            </Table>
          <div className="flex items-center space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
          <Toaster />
        </div>
      )
}

export default DataTable