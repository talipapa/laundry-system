import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Order, PageProps } from '@/types';
import AdminDashboardTemplate from './AdminDashboardTemplate';
import { LineChart, Line, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Legend, Bar, ResponsiveContainer, LabelList, Text, PieChart, Pie } from 'recharts';
import RecentTable from '@/Components/RecentTable';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/shadcn/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { format, formatDistance, parseISO } from 'date-fns';
import { availableStatus } from '@/Helpers/OrderStatus';
import AdminReservationAddons from '@/Components/AdminPartials/AdminReservationAddons';


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
                formatDistance(parseISO(row.getValue("updated_at")), new Date(), {includeSeconds: true, addSuffix: true})
            }
            </div>
        </div>
        },
    },
    {
        accessorKey: "reserved_at",
        header: ({column}) => {
          return (
            <Button
              variant="ghost"
              className='px-4'
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Reserved At
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          )},
        cell: ({ row }) => {
          return <div className='flex flex-col items-start'>
            <div>
              {format(row.getValue("reserved_at"), 'MMM dd yyyy')}
            </div>
            <div className='bg-green-400 dark:bg-green-900  rounded-sm px-1'>
              {format(row.getValue("reserved_at"), 'EEEE')}
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
        cell: ({ row, getValue }: any) => {
    
        return <div className='flex flex-col items-start'>
        <div className={`${getValue().foreground} text-black px-2 rounded-lg`}>
            {getValue().name}
        </div>
        </div>
        }
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
        size: 1
    },
    ]
  
const customColumnVisiblity = {
'created_at': false,
}

export default function Dashboard({ auth, statistics, recentReservations, recentCompletedTransactions }: any) {

    const addOns = statistics['totalAddOnsCount']
    const CustomTooltip = ({ active, payload, label, description }: any) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-[#f1f1f1] shadow-lg dark:bg-black p-2 rounded-lg">
              <p className="text-xl font-semibold">{label}</p>
              <p className="label">{`Over ${payload[0].value} transaction has this ${description}`}</p>
            </div>
          );
        }
      
        return null;
    };





    return (
        <AdminDashboardTemplate auth={auth} headerText="Dashboard">
            <div className='flex flex-col space-y-6 mb-6'>
                <div className='grid xl:grid-cols-3 gap-3 items-start'>
                    <div className='bg-white dark:bg-[#2E2C2C] p-6 items-start flex flex-col rounded-lg'>
                        <h1 className='text-sm xl:text-lg font-semibold text-black dark:text-white'>TOTAL TRANSACTIONS</h1>
                        <h1 className='text-2xl font-semibold text-[#F9844A]'>{statistics['totalTransactions']}</h1>
                        <div className='border-t-2 border-slate-800 dark:border-white mt-3 pt-2 w-full flex flex-row justify-between'>
                            <span className='dark:text-[#ffffff98]'>On-going transactions</span>
                            <span className='font-bold'>{statistics['totalCurrentOrder']}</span>
                        </div>
                        <div className='w-full flex flex-row justify-between'>
                            <span className='dark:text-[#ffffff98]'>Completed transactions</span>
                            <span className='font-bold'>{statistics['totalCompletedOrder']}</span>
                        </div>
                    </div>
                    <div className='bg-white dark:bg-[#2E2C2C] p-6 items-start flex flex-col rounded-lg'>
                        <h1 className='text-sm xl:text-lg  font-semibold text-black dark:text-white'>TOTAL REVENUE</h1>
                        <h1 className='text-2xl font-semibold text-[#F9844A]'>{`₱ ${statistics['totalTransactionPrice']}`}</h1>

                    </div>
                    <div className='bg-white dark:bg-[#2E2C2C] p-6 items-start flex flex-col rounded-lg'>
                        <h1 className='text-sm xl:text-lg  font-semibold text-black dark:text-white'>TOTAL CUSTOMERS</h1>
                        <h1 className='text-2xl font-semibold text-[#F9844A]'>{`${statistics['totalCustomer']}`}</h1>
                    </div>

                </div>
                <div className='grid xl:grid-cols-3 gap-10 bg-white dark:bg-[#2E2C2C] p-6 pb-14 rounded-lg'>
                    <div className='max-h-[300px] w-[full] xl:col-span-2 flex flex-col items-center'>
                        <h1 className='text-sm xl:text-lg font-semibold text-black dark:text-white mb-4'>MOST PICKED ADD-ONS</h1>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={addOns} layout="horizontal" margin={{right: 30, top:10}}>
                                <XAxis dataKey="name" type='category' padding="gap" tickMargin={8}/>
                                <YAxis />
                                <Tooltip cursor={false} content={<CustomTooltip description="addon"/>} />
                                <Bar name='mostly picked' dataKey="count">
                                    <LabelList dataKey="count" position="right" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='max-h-[300px] w-[full] flex flex-col items-center'>
                        <h1 className='text-sm xl:text-lg font-semibold text-black dark:text-white mb-4'>SERVICE TYPE</h1>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Legend />
                                <Tooltip content={<CustomTooltip description="service type"/>} />
                                <Pie data={statistics['serviceTypeData']} dataKey="count" nameKey="name" >
                                    <LabelList dataKey="count" position="inside"  />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    
                </div>

                <div className='bg-white dark:bg-[#2E2C2C] p-6 rounded-lg text-center'>
                    <h1 className='text-sm xl:text-lg font-semibold text-black dark:text-white mb-4'>RECENT TRANSACTIONS</h1>
                    <RecentTable columns={columns} data={recentReservations} customColumnVisiblity={undefined}/>
                </div>
                <div className='bg-white dark:bg-[#2E2C2C] p-6 rounded-lg text-center'>
                    <h1 className='text-sm xl:text-lg font-semibold text-black dark:text-white mb-4'>RECENT COMPLETED TRANSACTIONS</h1>
                    <RecentTable columns={columns} data={recentCompletedTransactions} customColumnVisiblity={undefined}/>
                </div>
            </div>
        </AdminDashboardTemplate>
    );
}
