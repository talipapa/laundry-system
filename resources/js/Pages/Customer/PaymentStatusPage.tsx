import React, { useState } from 'react'
import CustomerDashboardTemplate from './CustomerDashboardTemplate'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { Separator } from '@/shadcn/ui/separator'
import { FaHouse } from 'react-icons/fa6'
import { useFormik } from 'formik'
import { PaymongoPaymentSchema } from '@/Schema/GuestServicesBooking'
import { router } from '@inertiajs/react'
import { Button } from '@/shadcn/ui/button'
import { Input } from '@/shadcn/ui/input'
import { error } from 'console'
import { Alert, AlertDescription, AlertTitle } from '@/shadcn/ui/alert'



type Props = {}

const PaymentStatusPage = ({intent_id, auth, webInfo, geoLocation, transaction, paymentIntent, error}: any) => {
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)

  const {values, errors, touched, handleSubmit, handleBlur, handleChange, setValues, setFieldValue, setFieldTouched, setErrors, resetForm, isValid, setStatus, status} = useFormik({
    initialValues: {
      paymentType: "card",
      creditCardNumber: '',
      creditCardExpMonth: '',
      creditCardExpYear: '',
      creditCardVerificationValue: '',
      firstName: auth.user.first_name,
      lastName: auth.user.last_name,
      email: auth.user.email,
      address: auth.user.address,
      paymentIntent: paymentIntent.id
    },
    validationSchema: PaymongoPaymentSchema,
    onSubmit: (values) => {
      console.log(values)
      router.post(route('services.make-payment'), values, {
        onBefore: () => {
          setIsDisabledButton(true)
        },
        onError: (e) => {
          setErrors(e)
        },
        onFinish: () => {
          setIsDisabledButton(false)
        }
      })
    }
  })

  return (
    <CustomerDashboardTemplate auth={auth} headerText="Dashboard" webInfo={webInfo} geoLocation={geoLocation} currentTransaction={auth?.currentTransaction}>
      <div className='grid md:grid-cols-2 gap-x-36'>
        <div className='w-full  rounded-lg  p-6 space-y-3'>  
          <div className='w-full flex flex-row items-end justify-between'>
            <div className='flex flex-col'>
              <span>
              {`# ${transaction?.id}`}
              </span>
              <div className='flex flex-row space-x-1 font-semibold'>
                <FaHouse className='text-xl'/>
                <span>{transaction?.address}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div className='flex flex-col'>
            <div className='flex flex-row space-x-2'>
              <span className='font-semibold uppercase'>Service</span>
              <span>:</span>
              <span className='font-semibold '>
                {transaction?.service_type}
              </span>
            </div>
            <div className='flex flex-row space-x-2'>
              <span className='font-semibold uppercase'>Add-ons</span>
              <span>:</span>
              <span className='font-semibold '>
                {transaction?.add_ons?.map((addOn: any) => addOn).join(', ')}
                
              </span>
            </div>
          </div>
          <Separator />
          <div className='flex flex-row space-x-2 md:justify-end'>
            <span className='font-semibold uppercase'>Amount</span>
            <span>:</span>
            <span className='font-semibold '>
              {`P ${transaction?.total_price}.00`}
            </span>
          </div>
          
        </div>
        <div className='bg-white w-full  rounded-lg shadow-lg p-6 space-y-3'>  
          <form onSubmit={handleSubmit} className='w-full flex flex-col justify-between h-full'>
            <div className='w-full flex flex-col space-y-3 mb-4'>
              <div className='w-full'>
                <label htmlFor="paymentType" className='text-lg font-semibold'>Payment method</label>

                <select id='paymentType' name="paymentType" defaultValue="card" className={`w-full px-2 ${errors.paymentType ? "bg-red-400" : "bg-[#e2dfdf]"}`} onChange={(e) => {
                  resetForm()
                  setFieldValue("paymentType", e.target.value)
                  
                }}>
                  <option value="card">Credit Card</option>
                  <option value="gcash">Gcash</option>
                  <option value="grab_pay">Grab Pay</option>
                  <option value="paymaya">Paymaya</option>
                </select>
                
              </div>
              {error ? (
                <Alert variant="destructive">
                  <AlertTitle>Payment declined!</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              ) : null}

              {values.paymentType === "card" ? (
                <div className='flex flex-col space-y-2'>
                  <div>
                    <Input name='creditCardNumber' placeholder='Credit Card Number' maxLength={16} onChange={handleChange} onBlur={handleBlur}/>
                    {errors.creditCardNumber && touched.creditCardNumber ? (
                      <span className='text-red-500'>{errors.creditCardNumber}</span>
                    ) : ""}
                  </div>
                  <div className='flex flex-row space-x-4 w-full'>
                    <div className='w-full'>
                      <Input name='creditCardExpMonth' placeholder='Month' maxLength={2} onChange={handleChange} onBlur={handleBlur}/>
                      {errors.creditCardExpMonth && touched.creditCardExpMonth ? (
                        <span className='text-red-500'>{errors.creditCardExpMonth}</span>
                      ) : null}
                    </div>
                    <div className='w-full'>
                      <Input name='creditCardExpYear' placeholder='Year' maxLength={2} onChange={handleChange} onBlur={handleBlur}/>
                      {errors.creditCardExpYear && touched.creditCardExpYear ? (
                        <span className='text-red-500'>{errors.creditCardExpYear}</span>
                      ) : null}

                    </div>
                  </div>
                  <div>
                    <Input name='creditCardVerificationValue' placeholder='Cvv' maxLength={3}  onChange={handleChange} onBlur={handleBlur}/>
                    {errors.creditCardVerificationValue && touched.creditCardVerificationValue ? (
                      <span className='text-red-500'>{errors.creditCardVerificationValue}</span>
                    ) : null}

                  </div>
                </div>
              ) : null}
              <span className='text-lg font-semibold'>Personal details</span>
              <div className='flex flex-col space-y-2'>
                <div className='flex flex-row space-x-2'>
                  <div className='w-full'>
                    <Input name='firstName' placeholder='First name' value={values.firstName}  onChange={handleChange} onBlur={handleBlur}/>
                    {errors.firstName && touched.firstName ? (
                      <span className='text-red-500'>{errors.firstName.toString()}</span>
                    ) : ""}
                  </div>
                  <div className='w-full'>
                    <Input name='lastName' placeholder='Last name' value={values.lastName}  onChange={handleChange} onBlur={handleBlur}/>
                    {errors.lastName && touched.lastName ? (
                      <span className='text-red-500'>{errors.lastName.toString()}</span>
                    ) : ""}
                  </div>
                </div>
                <div className='w-full'>
                  <Input name='email' placeholder='Email' value={values.email}  onChange={handleChange} onBlur={handleBlur}/>
                  {errors.email && touched.email ? (
                    <span className='text-red-500'>{errors.email.toString()}</span>
                  ) : ""}
                </div>
                <div className='w-full'>
                  <Input name='address' placeholder='Last name' value={values.address} onChange={handleChange} onBlur={handleBlur}/>
                  {errors.address && touched.address ? (
                    <span className='text-red-500'>{errors.address.toString()}</span>
                  ) : ""}
                </div>
                
              </div>
                           
            </div>
            
            <Button disabled={isDisabledButton} type='submit'>Pay now</Button>
          </form>
        
        </div>
      </div>

    </CustomerDashboardTemplate>
    )
}

export default PaymentStatusPage