import { useFormik } from "formik"
import { InputTextField } from "../InputCustomFields"
import { AdminSetupSchema, BusinessInformationSchema } from "@/Schema/AdminSetupSchema"
import { Button } from "@/shadcn/ui/button"
import { useState } from "react"
import { router } from "@inertiajs/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shadcn/ui/dialog"
import { Toaster } from '@/shadcn/ui/toaster'
import { useToast } from "@/shadcn/ui/use-toast"


const BusinessInformation = ({webSettings}: any) => {
    const {toast} = useToast()

    const {values, errors, touched, handleSubmit, handleBlur, handleChange, setValues, setFieldValue, setFieldTouched, isValid} = useFormik({
        initialValues: {
            email: webSettings?.email ?? '',
            phone: webSettings?.phone_number ?? '',
            address: webSettings?.address ?? ''
        },
        validationSchema: BusinessInformationSchema,
        onSubmit: (values) => {
            router.put(route('admin.web-settings.contact-info'), values,{
                preserveState: true,
                onStart: () => {
                    setIsDisabledButton(true)
                },
                onSuccess: () => {
                    setIsDisabledButton(false)
                    toast({title: 'Successfully saved', variant: 'success'})
                },
                onError: () => {
                    setIsDisabledButton(false)
                },
                onFinish: () => {
                    setIsDisabledButton(false)
                }
            })
            console.log(values)
        }
    })
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)

  return (
    <form onSubmit={handleSubmit} className='w-full bg-white  dark:bg-[#2E2C2C] rounded-md p-6 dark:text-white'>
        <h2 className='text-lg mb-3'>Business information</h2>
        <div className='flex flex-col items-start space-y-3'>
        <div className='flex flex-row space-x-5 w-full'>
            <InputTextField 
                labelName="Email"
                formikFieldName="email"
                propError={errors.email}
                propTouched={touched.email}
                values={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="flex flex-col space-y-1 w-full"
            />
            <InputTextField 
                labelName="Phone number"
                formikFieldName="phone"
                propError={errors.phone}
                propTouched={touched.phone}
                values={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="flex flex-col space-y-1 w-full"
            />
        </div>
        <InputTextField 
            labelName="Address"
            formikFieldName="address"
            propError={errors.address}
            propTouched={touched.address}
            values={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className="flex flex-col space-y-1 w-full"
        />
        <Button type="submit" className="py-2 rounded-md" disabled={!isValid || isDisabledButton}>Save</Button>
        </div>
        <Toaster/>
    </form>
  )
}

export default BusinessInformation