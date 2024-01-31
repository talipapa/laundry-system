import CanvasRestriction from '@/Components/CanvasRestriction'
import GuestFootbar from '@/Components/CustomerPartials/GuestFootbar'
import GuestNavbar from '@/Components/CustomerPartials/GuestNavbar'
import GuestPageLayout from '@/Components/CustomerPartials/GuestPageLayout'
import { InputTextField } from '@/Components/InputCustomFields'
import { availableDay } from '@/Helpers/AvailableDay'
import { Head, useForm } from '@inertiajs/react'
import { format } from 'date-fns'
import { Field, useFormik, useFormikContext } from 'formik'
import React, { useState } from 'react'

type Props = {}

const ServicesPage = ({webInfo, geoLocation}: any) => {
  
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
  const {values, errors, touched, handleSubmit, handleBlur, handleChange, setValues, setFieldValue, setFieldTouched, isValid} = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      serviceType: '',
      addOns: [],
      reserveOn: '',
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const handleRadioButtons = (serviceType: any) => {
    setFieldValue('serviceType', serviceType)
    setFieldTouched('serviceType', serviceType)
  }

  const handleAddonChange = (e: any) => {
    const { checked, name, value } = e.target;
    if (checked) {
      setFieldValue("addOns", [...values.addOns, {'name': name, 'price': value}]);
    } else {
      setFieldValue(
        "addOns",
        values.addOns.filter((v) => v['name'] !== name)
      );
    }
  };

  console.log(values.addOns)

  return (
    <GuestPageLayout>
      
      <Head title="Services" />
      <GuestNavbar webInfo={webInfo}/>
      {/* Main content container */}
      <div className='min-h-[900px] bg-[#EEEEEE]'>
        <CanvasRestriction className="grid grid-cols-3 gap-14 py-12 items-start">
          <div className='flex flex-col space-y-6'>
            <div className='bg-white w-full rounded-lg shadow-lg p-4'>
              <span className="text-xl font-semibold">Your booking details</span>
              
            </div>
            <div className='bg-white w-full rounded-lg shadow-lg p-4'>
              <span className="text-xl font-semibold">Total price</span>
            </div>

            
          </div>
          <form onSubmit={handleSubmit} className='col-span-2 flex flex-col space-y-6 items-end'>
            <div className='bg-white w-full rounded-lg shadow-lg p-4'>
              <span className="text-xl font-semibold ">Create your account</span>
              <div className='flex flex-row space-x-3 w-full mt-3'>
                <InputTextField 
                  labelName="First name"
                  formikFieldName="firstName"
                  propError={errors.firstName}
                  propTouched={touched.firstName}
                  values={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex flex-col space-y-1 w-full"
                />
                <InputTextField 
                  labelName="Last name"
                  formikFieldName="lastName"
                  propError={errors.lastName}
                  propTouched={touched.lastName}
                  values={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex flex-col space-y-1 w-full"
                />
              </div>
              <div className='flex flex-row space-x-3 w-full mt-3'>
                <InputTextField 
                  labelName="Email address"
                  formikFieldName="emailAdd"
                  propError={errors.emailAddress}
                  propTouched={touched.emailAddress}
                  values={values.emailAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex flex-col space-y-1 w-full"
                />
              </div>
              <div className='flex flex-row space-x-3 w-full mt-3'>
                <InputTextField 
                  labelName="Password"
                  formikFieldName="password"
                  propError={errors.password}
                  propTouched={touched.password}
                  values={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex flex-col space-y-1 w-full"
                />
                <InputTextField 
                  labelName="Confirm password"
                  formikFieldName="password"
                  propError={errors.password}
                  propTouched={touched.password}
                  values={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex flex-col space-y-1 w-full"
                />
              </div>
            </div>
            <div className='bg-white w-full rounded-lg shadow-lg p-4 space-y-4'>
              
              <span className="text-xl font-semibold">Service type</span>
              <div className='flex flex-row w-full h-full'>
                <input type="radio" className='peer/fullService hidden' name='typeOfService' id='fullService' 
                onClick={(e) => handleRadioButtons({serviceType: {
                  name: "fullService",
                  price: 100
                }})}/>
                <label htmlFor='fullService' className='peer-checked/fullService:text-blue-400 border-2 border-slate-300 peer-checked/fullService:border-blue-500 w-full px-6 py-2 h-full me-2'>
                  <h2>₱ 100.00</h2>
                  <h1 className='font-semibold'>Full Service</h1>
                  
                </label>
                <input type="radio" className='peer/selfService hidden' name='typeOfService' id='selfService' onClick={(e) => handleRadioButtons({serviceType: {
                  name: "halfService",
                  price: 70
                }})}/>
                <label htmlFor='selfService' className='peer-checked/selfService:text-blue-400 border-2 border-slate-300 peer-checked/selfService:border-blue-500 w-full px-6 py-2 h-full ms-2'>
                  <h2>₱ 70.00</h2>
                  <h1 className='font-semibold'>Half Service</h1>
                </label>

              </div>
            </div>
            <div className='bg-white w-full rounded-lg shadow-lg p-4'>
              <span className="text-xl font-semibold">Add ons</span>
                <div role="group" aria-labelledby="checkbox-group"  >
                  <label>
                    <input type="checkbox" name="shoeCleaning" value="50" onChange={handleAddonChange}/>
                    Shoe cleaning
                  </label>
                  <label>
                    <input type="checkbox" name="ironing" value="30" onChange={handleAddonChange} />
                    Ironing
                  </label>
                </div>
            </div>
            <div className='bg-white w-full rounded-lg shadow-lg p-4'>
              <span className="text-xl font-semibold">Reserve on</span>
              <div>
                {format(availableDay(6), 'EEEE: MMMM dd, yyyy')}
              </div>
            </div>

            <button type='submit' className='bg-[#4A86FF] text-white p-2 rounded-sm' disabled={!isValid || isDisabledButton}>RESERVE NOW</button>

          </form>

        </CanvasRestriction>

      </div>

      <GuestFootbar webInfo={webInfo} geoLocation={geoLocation}/>
    </GuestPageLayout>
  )
}

export default ServicesPage