import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminDashboardTemplate from './AdminDashboardTemplate';
import { LineChart, Line, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Legend, Bar, ResponsiveContainer, LabelList, Text, PieChart, Pie } from 'recharts';


export default function Dashboard({ auth, statistics }: any) {

    const addOns = statistics['totalAddOnsCount']
    const CustomTooltip = ({ active, payload, label, description }: any) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-black p-2 rounded-lg">
              <p className="text-xl font-semibold">{label}</p>
              <p className="label">{`Over ${payload[0].value} transaction has this ${description}`}</p>
            </div>
          );
        }
      
        return null;
    };

    return (
        <AdminDashboardTemplate auth={auth} headerText="Dashboard">
            <div className='flex flex-col space-y-6'>
                <div className='grid xl:grid-cols-3 gap-3 items-start'>
                    <div className='bg-white dark:bg-[#2E2C2C] p-6 items-start flex flex-col rounded-lg'>
                        <h1 className='text-sm xl:text-lg font-semibold text-black dark:text-white'>TOTAL TRANSACTIONS</h1>
                        <h1 className='text-2xl font-semibold text-[#F9844A]'>{statistics['totalTransactions']}</h1>
                        <div className='border-t-2 border-white mt-3 pt-2 w-full flex flex-row justify-between'>
                            <span className='text-[#ffffff98]'>On-going transactions</span>
                            <span className='font-bold'>{statistics['totalCurrentOrder']}</span>
                        </div>
                        <div className='w-full flex flex-row justify-between'>
                            <span className='text-[#ffffff98]'>Completed transactions</span>
                            <span className='font-bold'>{statistics['totalCompletedOrder']}</span>
                        </div>
                    </div>
                    <div className='bg-white dark:bg-[#2E2C2C] p-6 items-start flex flex-col rounded-lg'>
                        <h1 className='text-sm xl:text-lg  font-semibold text-black dark:text-white'>TOTAL REVENUE</h1>
                        <h1 className='text-2xl font-semibold text-[#F9844A]'>{`₱ ${statistics['totalTransactionPrice']}`}</h1>

                    </div>

                </div>
                <div className='grid xl:grid-cols-3 gap-10 bg-white dark:bg-[#2E2C2C] p-6 pb-14 rounded-lg'>
                    <div className='max-h-[300px] w-[full] col-span-2 flex flex-col items-center'>
                        <h1 className='text-sm xl:text-lg font-semibold text-black dark:text-white mb-4'>MOST PICKED ADD-ONS</h1>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={addOns} layout="horizontal" margin={{right: 30, top:10}}>
                                <XAxis dataKey="name" type='category' padding="gap" tick={{fill: "#ffffff"}} tickMargin={8}/>
                                <YAxis tick={{fill: '#ffffffb3'}} />
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
                            <Tooltip content={<CustomTooltip description="addon"/>} />
                            <Pie data={statistics['serviceTypeData']} dataKey="count" nameKey="name" >
                                <LabelList dataKey="count" position="inside"  />
                            </Pie>
                        </PieChart>
                        </ResponsiveContainer>
                    </div>
                    
                </div>




            </div>
        </AdminDashboardTemplate>
    );
}
