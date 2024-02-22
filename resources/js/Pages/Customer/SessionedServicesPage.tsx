import CanvasRestriction from '@/Components/CanvasRestriction'
import GuestFootbar from '@/Components/CustomerPartials/GuestFootbar'
import GuestNavbar from '@/Components/CustomerPartials/GuestNavbar'
import GuestPageLayout from '@/Components/CustomerPartials/GuestPageLayout'
import { availableDay } from '@/Helpers/AvailableDay'
import { SessionedBookingSchema } from '@/Schema/GuestServicesBooking'
import { Input } from '@/shadcn/ui/input'
import { Head, router } from '@inertiajs/react'
import { format } from 'date-fns'
import { useFormik } from 'formik'
import React, { useState } from 'react'

type Props = {}

const SessionedServicesPage = ({webInfo, auth, geoLocation}: any) => {
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
    const {values, errors, touched, handleSubmit, handleBlur, handleChange, setValues, setFieldValue, setFieldTouched, setErrors, isValid} = useFormik({
      initialValues: {
        serviceType: '',
        addOns: [],
        reserveOn: '',
        address: auth.user?.address !== null ? `${auth.user?.address}` : '',
      },
      validationSchema: SessionedBookingSchema,
      onSubmit: (values) => {
        router.post(route('services.booking'), values, {
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
    const calculateTotalPrice = () => {
      let total = 0;
      if (values.serviceType !== '') {
        total += values.serviceType[2] as unknown as number
      }
      if (values.addOns.length > 0) {
        values.addOns.map((addon: any) => {
          total += parseInt(addon['price'])
        })
      }
      return total
    }
  
    const handleRadioButtonsForServiceType = (serviceType: any) => {
      setFieldValue('serviceType', serviceType)
    }
    const handleRadioButtonsForReserveOn = (serviceType: any) => {
      setFieldValue('reserveOn', serviceType)
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
    
  return (
    <GuestPageLayout>
      
      <Head title="Services" />
      <GuestNavbar webInfo={webInfo} auth={auth}/>
      {/* Main content container */}
      <div className='min-h-[900px] bg-[#EEEEEE]'>
        <CanvasRestriction className="grid lg:grid-cols-3  gap-14 py-12 items-start">
          <div className='flex flex-col space-y-6 col-span-2 lg:col-span-1 lg:sticky lg:top-[100px]'>
            <div className='bg-white w-full rounded-lg shadow-lg p-4 flex flex-col'>
              <span className="text-xl font-bold mb-2">Your booking details</span>
              <div className='grid grid-cols-2 items-start  sticky top-0 h-full gap-y-3'>
                {/* Service type */}
                <span className='font-semibold text-slate-600'>Service type</span>
                <div className='flex flex-col space-x-2 xl:flex-row xl:items-center'>
                  <span>{values.serviceType[0]}</span>
                  {
                    values.serviceType[2] !== undefined && 
                    <span className='text-sm'>{`- ₱ ${values.serviceType[2]}`}</span>
                  }
                  
                </div>
                {/* Add ons */}
                <span className='font-semibold text-slate-600'>Add ons</span>
                <div>
                  {values.addOns.map((addon) => (
                    <div className='flex flex-col'>
                      <div className='flex flex-col space-x-2 xl:flex-row xl:items-center'>
                        <span>{addon['name']}</span>
                        <span className='text-sm'>{`- ₱ ${addon['price']}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Reserve on */}
                <span className='font-semibold text-slate-600'>Reserve on</span>
                <div>
                  {values.reserveOn !== '' && (<div className='flex flex-col'><span>{format(values.reserveOn, 'EEEE')}</span><span>{format(values.reserveOn, 'MMM dd yyyy')}</span></div>)}
                </div>
              </div>
            
            </div>
            <div className='bg-white w-full rounded-lg shadow-lg p-4 flex flex-col'>
              <span className="text-xl font-semibold">Total price</span>
              <span className="text-3xl font-semibold">{`₱ ${calculateTotalPrice()}`}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='col-span-2 flex flex-col space-y-6 items-end'>
            <div className='bg-white w-full rounded-lg shadow-lg p-4'>
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="address" className="form-label text-xl font-semibold">
                  Address
                </label>
                <div className="flex flex-col md:flex-col md:space-y-1 ">
                  <Input
                    type="text"
                    value={values.address}
                    id="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && touched.address ? (
                    <div className="text-red-500 mt-2">{errors.address}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='w-full'>
              <span className={`text-md ${errors.serviceType ? 'text-red-500' : ''}`}>{errors.serviceType}</span>
              <div className={`w-full rounded-lg shadow-lg p-4  bg-white border-2 ${errors.serviceType ? 'border-red-400' : 'border-white'}`}>
                <div className='flex flex-col'>
                  <span className="text-xl font-semibold">Service type</span>
                  
                </div>
                <div className='flex flex-row w-full h-full mt-2'>
                  <input type="radio" className='peer/fullService hidden' name='typeOfService' id='fullService' 
                  onClick={(e) => handleRadioButtonsForServiceType(['Full service', 'FULL_SERVICE', 100])}/>
                  <label htmlFor='fullService' className='peer-checked/fullService:text-[#F9844A] border-2 border-[#f3f2f2] bg-[#202020] text-white hover:bg-[#353535] transition ease-in-out duration-200  rounded-lg shadow-lg peer-checked/fullService:border-[#F9844A] peer-checked/fullService:bg-[#202020]  w-full px-6 py-2 h-full me-2'>
                    <h1 className='font-semibold'>Full Service</h1>
                    <h2>₱ 100.00</h2>
                    
                  </label>
                  <input type="radio" className='peer/selfService hidden' name='typeOfService' id='selfService' onClick={(e) => handleRadioButtonsForServiceType(['Self service', 'HALF_SERVICE', 80])}/>
                  <label htmlFor='selfService' className='peer-checked/selfService:text-[#F9844A] border-2 border-[#f3f2f2] bg-[#202020] text-white hover:bg-[#353535] transition ease-in-out duration-200  rounded-lg shadow-lg peer-checked/selfService:border-[#F9844A] peer-checked/selfService:bg-[#202020]  w-full px-6 py-2 h-full me-2'>
                    <h1 className='font-semibold'>Half Service</h1>
                    <h2>₱ 70.00</h2>
                  </label>
                

                </div>
              </div>
            </div>
            <div className='bg-white w-full rounded-lg shadow-lg p-4'>
              <span className="text-xl font-semibold">Add ons</span>
                <div role="group" className='space-x-3 mt-2' aria-labelledby="checkbox-group">
                  <label className='space-x-2'>
                    <input type="checkbox" name="SHOE_CLEANING" value="50" onChange={handleAddonChange}/>
                    <span>Shoe cleaning</span>
                  </label>
                  <label className='space-x-2'>
                    <input type="checkbox" name="IRONING" value="30" onChange={handleAddonChange} />
                    <span>Ironing</span>
                  </label>
                </div>
            </div>

            <div className='w-full'>
              <span className={`text-md ${errors.reserveOn ? 'text-red-500' : ''}`}>{errors.reserveOn}</span>
              <div className={`w-full rounded-lg shadow-lg p-4  bg-white border-2 ${errors.reserveOn ? 'border-red-400' : 'border-white'}`}>
                <div className='flex flex-col'>
                  <span className="text-xl font-semibold">Reserve on</span>
                  
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mt-2'>
                  {/* SUNDAY */}
                  <input type="radio" className='peer/sunday hidden' name='reserveOn' id='sunday' 
                  onClick={(e) => handleRadioButtonsForReserveOn(availableDay(0))}/>
                  <label htmlFor='sunday' className='peer-checked/sunday:text-[#F9844A] border-2 border-[#f3f2f2] bg-[#202020] text-white hover:bg-[#353535] transition ease-in-out duration-200  rounded-lg shadow-lg peer-checked/sunday:border-[#F9844A] peer-checked/sunday:bg-[#202020]  w-full p-3 h-full'>
                    <h1 className='tracking-widest'>{format(availableDay(0), 'EEEE')}</h1>
                    <span className='text-lg font-semibold'>{format(availableDay(0), 'MMMM dd')}</span>
                  </label>
                  {/* MONDAY */}
                  <input type="radio" className='peer/monday hidden' name='reserveOn' id='monday' 
                  onClick={(e) => handleRadioButtonsForReserveOn(availableDay(1))}/>
                  <label htmlFor='monday' className='peer-checked/monday:text-[#F9844A] border-2 border-[#f3f2f2] bg-[#202020] text-white hover:bg-[#353535] transition ease-in-out duration-200  rounded-lg shadow-lg peer-checked/monday:border-[#F9844A] peer-checked/monday:bg-[#202020]  w-full p-3 h-full'>
                    <h1 className='tracking-widest'>{format(availableDay(1), 'EEEE')}</h1>
                    <span className='text-lg font-semibold'>{format(availableDay(1), 'MMMM dd')}</span>
                  </label>
                  {/* TUESDAY */}
                  <input type="radio" className='peer/tuesday hidden' name='reserveOn' id='tuesday' 
                  onClick={(e) => handleRadioButtonsForReserveOn(availableDay(2))}/>
                  <label htmlFor='tuesday' className='peer-checked/tuesday:text-[#F9844A] border-2 border-[#f3f2f2] bg-[#202020] text-white hover:bg-[#353535] transition ease-in-out duration-200  rounded-lg shadow-lg peer-checked/tuesday:border-[#F9844A] peer-checked/tuesday:bg-[#202020]  w-full p-3 h-full'>
                    <h1 className='tracking-widest'>{format(availableDay(2), 'EEEE')}</h1>
                    <span className='text-lg font-semibold'>{format(availableDay(2), 'MMMM dd')}</span>
                  </label>
                  {/* WEDNESDAY */}
                  <input type="radio" className='peer/wednesday hidden' name='reserveOn' id='wednesday' 
                  onClick={(e) => handleRadioButtonsForReserveOn(availableDay(3))}/>
                  <label htmlFor='wednesday' className='peer-checked/wednesday:text-[#F9844A] border-2 border-[#f3f2f2] bg-[#202020] text-white hover:bg-[#353535] transition ease-in-out duration-200  rounded-lg shadow-lg peer-checked/wednesday:border-[#F9844A] peer-checked/wednesday:bg-[#202020]  w-full p-3 h-full'>
                    <h1 className='tracking-widest'>{format(availableDay(3), 'EEEE')}</h1>
                    <span className='text-lg font-semibold'>{format(availableDay(3), 'MMMM dd')}</span>
                  </label>
                  {/* THURSDAY */}
                  <input type="radio" className='peer/thursday hidden' name='reserveOn' id='thursday' 
                  onClick={(e) => handleRadioButtonsForReserveOn(availableDay(4))}/>
                  <label htmlFor='thursday' className='peer-checked/thursday:text-[#F9844A] border-2 border-[#f3f2f2] bg-[#202020] text-white hover:bg-[#353535] transition ease-in-out duration-200  rounded-lg shadow-lg peer-checked/thursday:border-[#F9844A] peer-checked/thursday:bg-[#202020]  w-full p-3 h-full'>
                    <h1 className='tracking-widest'>{format(availableDay(4), 'EEEE')}</h1>
                    <span className='text-lg font-semibold'>{format(availableDay(4), 'MMMM dd')}</span>
                  </label>
                  {/* FRIDAY */}
                  <input type="radio" className='peer/friday hidden' name='reserveOn' id='friday' 
                  onClick={(e) => handleRadioButtonsForReserveOn(availableDay(5))}/>
                  <label htmlFor='friday' className='peer-checked/friday:text-[#F9844A] border-2 border-[#f3f2f2] bg-[#202020] text-white hover:bg-[#353535] transition ease-in-out duration-200  rounded-lg shadow-lg peer-checked/friday:border-[#F9844A] peer-checked/friday:bg-[#202020]  w-full p-3 h-full'>
                    <h1 className='tracking-widest'>{format(availableDay(5), 'EEEE')}</h1>
                    <span className='text-lg font-semibold'>{format(availableDay(5), 'MMMM dd')}</span>
                  </label>
                  {/* SATURDAY */}
                  <input type="radio" className='peer/saturday hidden' name='reserveOn' id='saturday' 
                  onClick={(e) => handleRadioButtonsForReserveOn(availableDay(6))}/>
                  <label htmlFor='saturday' className='peer-checked/saturday:text-[#F9844A] border-2 border-[#f3f2f2] bg-[#202020] text-white hover:bg-[#353535] transition ease-in-out duration-200  rounded-lg shadow-lg peer-checked/saturday:border-[#F9844A] peer-checked/saturday:bg-[#202020]  w-full p-3 h-full'>
                    <h1 className='tracking-widest'>{format(availableDay(6), 'EEEE')}</h1>
                    <span className='text-lg font-semibold'>{format(availableDay(6), 'MMMM dd')}</span>
                  </label>
                </div>
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

export default SessionedServicesPage