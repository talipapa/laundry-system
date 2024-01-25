
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { PageProps } from '@/types';
import { useFormik } from 'formik';
import { useToast } from '@/shadcn/ui/use-toast';
import { InputTextField } from '@/Components/InputCustomFields';
import { Button } from '@/shadcn/ui/button';
import { ProfileInformationSchema } from '@/Schema/ProfileInformationSchema';
import { Toaster } from '@/shadcn/ui/toaster';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;
    const { toast } = useToast()
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
    const {values, errors, touched, handleSubmit, handleBlur, handleChange, setValues, setFieldValue, setFieldTouched, isValid} = useFormik({
        initialValues: {
            first_name: user?.first_name ?? '',
            last_name: user?.last_name ?? '',
            email: user?.email ?? ''
        },
        validationSchema: ProfileInformationSchema,
        onSubmit: (values) => {
            router.patch(route('admin.profile.update'), values,{
                preserveState: true,
                onStart: () => {
                    setIsDisabledButton(true)
                },
                onSuccess: () => {
                    setIsDisabledButton(false)
                    toast({title: status, variant: 'success'})
                },
                onError: () => {
                    setIsDisabledButton(false)
                },
                onFinish: () => {
                    setIsDisabledButton(false)
                }
            })
        }
    })

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-slate-50">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 dark:text-black">
                <InputTextField 
                    labelName="First name"
                    formikFieldName="first_name"
                    propError={errors.first_name}
                    propTouched={touched.first_name}
                    values={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex flex-col space-y-1 w-full dark:text-white"
                />
                <InputTextField 
                    labelName="Last name"
                    formikFieldName="last_name"
                    propError={errors.last_name}
                    propTouched={touched.last_name}
                    values={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex flex-col space-y-1 w-full dark:text-white"
                />
                <InputTextField 
                    labelName="Email"
                    formikFieldName="email"
                    propError={errors.email}
                    propTouched={touched.email}
                    values={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex flex-col space-y-1 w-full dark:text-white"
                />
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button type='submit' disabled={!isValid || isDisabledButton}>Save</Button>
                </div>
            </form>
            <Toaster/>
        </section>
    );
}
