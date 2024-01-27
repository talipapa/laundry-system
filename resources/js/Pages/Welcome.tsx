import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { format } from 'date-fns';
import { availableDay } from '@/Helpers/AvailableDay';
import CanvasRestriction from '@/Components/CanvasRestriction';
import { useEffect } from 'react';


export default function Welcome({ auth, webInfo, geoLocation, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {


    return (
        <div className='min-h-[100vh] flex flex-col justify-between'>
            <Head title="Welcome" />
            {/* Header container */}
            <div>
                {/* Notification navbar */}
                <div className={`w-full h-[60px] bg-[#F9844A]`}>
                    <CanvasRestriction className="flex flex-col items-center justify-center">
                        <span className='font-semibold text-xl select-none'>FIRST OPENING 60% OFF 🎉🎉🎉</span>
                    </CanvasRestriction>
                </div>

                {/* Navbar */}
                <div className={`w-full h-[80px] bg-[#000000d7]`}>
                    <CanvasRestriction className="flex flex-row items-center justify-between">
                        <h1 className='text-[#F9844A] text-xl font-semibold'>Laundry system</h1>
                        <div className='flex flex-row space-x-6'>
                            <Link href={route('login')} className="text-white hover:text-[#F9844A]">Login</Link>
                            <Link href={route('register')} className="text-white hover:text-[#F9844A]">Register</Link>
                        </div>
                        
                        
                        

                    </CanvasRestriction>
                </div>
            </div>

            {/* Footer container */}
            <div className={`w-full h-[250px] bg-[#000000]`}>
                <CanvasRestriction>

                </CanvasRestriction>
            
            </div>

        </div>
    );
}
