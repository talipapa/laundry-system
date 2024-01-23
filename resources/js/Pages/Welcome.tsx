import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { format } from 'date-fns';
import { availableDay } from '@/Helpers/AvailableDay';


export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {




    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">

                {format(availableDay(6), 'EEEE: MMMM dd, yyyy')}
                

            </div>

        </>
    );
}
