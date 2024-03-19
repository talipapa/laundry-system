import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen grid md:grid-cols-3 md:justify-center sm:pt-0 bg-gray-100">
            <div className="w-full h-full px-6 py-4 col-span-2 bg-white shadow-md sm:rounded-lg items-center justify-center">
                <div className='h-full w-full flex flex-col items-center justify-center'>
                    <div className='w-[70%] max-w-[600px]'>
    
                        {children}
                    </div>
                </div>
            </div>
            <div className="md:flex overflow-y-hidden md:flex-col md:items-center md:justify-center hidden md:relative">
                <img src="assets/laundromat.jpg" className='h-full w-full object-cover absolute' />
            </div>
        </div>
    );
}
