import { useRef, FormEventHandler, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import { PasswordSchema, ProfileInformationSchema } from '@/Schema/ProfileInformationSchema';
import { useToast } from '@/shadcn/ui/use-toast';
import { InputTextField } from '@/Components/InputCustomFields';
import { Button } from '@/shadcn/ui/button';
import { eachHourOfInterval } from 'date-fns';

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>();
    const currentPasswordInput = useRef<HTMLInputElement>();

    // const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    //     current_password: '',
    //     password: '',
    //     password_confirmation: '',
    // });

    // const updatePassword: FormEventHandler = (e) => {
    //     e.preventDefault();

    //     put(route('password.update'), {
    //         preserveScroll: true,
    //         onSuccess: () => reset(),
    //         onError: (errors) => {
    //             if (errors.password) {
    //                 reset('password', 'password_confirmation');
    //                 passwordInput.current?.focus();
    //             }

    //             if (errors.current_password) {
    //                 reset('current_password');
    //                 currentPasswordInput.current?.focus();
    //             }
    //         },
    //     });
    // };
    
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
    const {toast} = useToast()
    const {values, errors, touched, handleSubmit, handleBlur, handleChange, setValues, setFieldValue, setErrors, setFieldTouched, resetForm, isValid} = useFormik({
        initialValues: {
            current_password: '',
            password: '',
            password_confirmation: ''
        },
        validationSchema: PasswordSchema,
        onSubmit: (values) => {
            router.put(route('password.update'), values,{
                preserveState: true,
                onStart: () => {
                    setIsDisabledButton(true)
                },
                onSuccess: () => {
                    resetForm()
                    toast({title: 'Password updated successfully', variant: 'success'})
                },
                onError: (e: any) => {
                    setIsDisabledButton(false)
                    if (e.password) {
                        setErrors({password: 'Invalid password'})
                        
                    }
                    
                    if (e.current_password) {
                        setErrors({current_password: 'Invalid password'})
                    }
                
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
                <h2 className="text-lg font-medium text-gray-900 dark:text-slate-50">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <InputTextField 
                    labelName="Current password"
                    formikFieldName="current_password"
                    type="password"
                    propError={errors.current_password}
                    propTouched={touched.current_password}
                    values={values.current_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex flex-col space-y-1 w-full dark:text-white"
                />
                <InputTextField 
                    labelName="Password"
                    formikFieldName="password"
                    type="password"
                    propError={errors.password}
                    propTouched={touched.password}
                    values={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex flex-col space-y-1 w-full dark:text-white"
                />
                
                <InputTextField
                    labelName="Confirm password"
                    formikFieldName="password_confirmation"
                    type="password"
                    propError={errors.password_confirmation}
                    propTouched={touched.password_confirmation}
                    values={values.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex flex-col space-y-1 w-full dark:text-white"
                />


                <div className="flex items-center gap-4">
                    <Button type='submit' disabled={!isValid || isDisabledButton}>Save</Button>
                </div>
            </form>
        </section>
    );
}
