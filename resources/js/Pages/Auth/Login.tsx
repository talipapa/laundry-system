import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className='w-full items-center flex flex-row justify-center text-center text-4xl mb-6'>
                Login to Your Account
            </div>
            <form onSubmit={submit}>
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder='Email'
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <TextInput
                        id="password"
                        placeholder='Password'
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className='flex w-full flex-row justify-between items-center mt-5'>
                    <div className="flex flex-row items-bottom jsutify-center w-full">
                        <PrimaryButton className="w-full text-center items-center justify-center " disabled={processing}>
                            Log in
                        </PrimaryButton>       
                                    
                    </div>
                </div>
                <div className='flex flex-row justify-between mt-3'>
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                   
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
            </form>
            <div className='relative w-full mt-7 mb-12'>
                <div className='bottom-[-12px] z-[5] w-full px-5 absolute text-center'>
                    <span className='bg-white px-4 text-md font-semibold'>OR</span>
                </div>
                <hr className='mt-6 bottom-0 absolute w-full h-[3px] bg-[#807d7d] '/>
            </div>
            
            <div className='w-full flex flex-row items-center justify-center'>
                <Link
                    href={route('register')}
                    className="text-md font-semibold text-gray-600 hover:text-[#F2844A] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                >
                    Register an Account
                </Link>

            </div>
            
        </GuestLayout>
    );
}
