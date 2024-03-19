import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className='w-full items-center flex flex-row justify-center text-4xl mb-6'>
                Register an Account
            </div>
            <form onSubmit={submit} className='flex flex-col space-y-2'>
                <div>
                    <TextInput
                        id="first_name"
                        name="first_name"
                        placeholder='First name'
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="first_name"
                        isFocused={true}
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div>

                    <TextInput
                        id="last_name"
                        name="last_name"
                        placeholder='Last name'
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="Last name"
                        isFocused={true}
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div>

                    <TextInput
                        id="email"
                        type="email"
                        placeholder='Email'
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        placeholder='Confirm Password'
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex flex-row items-bottom jsutify-center w-full pt-5">
                    <PrimaryButton className="w-full text-center items-center justify-center " disabled={processing}>
                        Register
                    </PrimaryButton>       
                                
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
                    href={route('login')}
                    className="text-md font-semibold text-gray-600 hover:text-[#F2844A] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                >
                    Login your account
                </Link>

            </div>
        </GuestLayout>
    );
}
