import { InputNumberField, InputTextField } from "@/Components/InputCustomFields"
import { AdminSetupSchema } from "@/Schema/AdminSetupSchema"
import { Button } from "@/shadcn/ui/button"
import { useFormik } from "formik"
import React from "react"
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { set } from "date-fns"
import { Head, router } from "@inertiajs/react"
import { ModeToggle } from "@/Components/mode-toggle"

const AdminSetup = ({auth, webSettings}: any) => {
  const [viewState, setViewState] = React.useState({
    latitude: 14.730254480734871,
    longitude: 121.14297038843239,
    zoom: 12,
  })

  console.log(webSettings)
  const [currentPin, setCurrentPin] = React.useState<any>(null)


  const {values, errors, touched, handleSubmit, handleBlur, handleChange, setValues, setFieldValue, setFieldTouched, isValid} = useFormik({
    initialValues: {
      laundryLocation_lat: 0,
      laundryLocation_lng: 0,
      laundryLocation_email: '',
      laundryLocation_phone: '',
      laundryLocation_address: '',
    },
    validationSchema: AdminSetupSchema,
    onSubmit: (values) => {
      router.post(route('claim-ownership'), values)
    }
    
  })

  const handleMapClick = (e: any) => {
    const {lng, lat} = e.lngLat
    setFieldValue('laundryLocation_lat', lat)
    setFieldValue('laundryLocation_lng', lng)
  }
  

  return (
    <div className='max-w-[1400px] h-[100vh] mx-auto flex flex-col items-center'>
      <Head title="Setting it up" />
      <ModeToggle/>


      <div className='mt-12 w-full px-5 pb-10'>
        <div className="text-center mb-6">
          <h1 className='font-bold text-3xl text-[#F9844A] px-7'>Admin Setup</h1>
          <p className="opacity-65">You are currently seeing this because no owner is detected in the database</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8 items-start">
          <div className="rounded-lg w-full bg-[#edede9] dark:bg-[#3f3f3f] shadow-lg">
            <div className="flex flex-col p-6">
              <h2 className="text-lg font-bold mb-2">Account details</h2>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-10">
                  <div className="opacity-80 flex flex-col">
                    Email
                    <span className="border-s-4 border-[#3B838B] px-2">
                      {auth.user.email}
                    </span>
                  </div>

                </div>
                <div className="flex flex-row space-x-10">
                  <div className="opacity-80 flex flex-col">
                    First name
                    <span className="border-s-4 border-[#3B838B] px-2">
                      {auth.user.first_name}
                    </span>
                  </div>
                  <div className="opacity-80 flex flex-col">
                    Last name
                    <span className="border-s-4 border-[#3B838B] px-2">
                      {auth.user.last_name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="opacity-80 flex flex-col">
                    Current role
                    <span className="border-s-4 border-[#3B838B] px-2">
                      {auth.user.role}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg w-full">
            <div className="flex flex-col space-y-10">
              <div>
                <div className="px-6 mb-3">
                  <h3 className="opacity-60">Step 1</h3>
                  <h2 className="text-lg font-bold">Where is your laundry shop located</h2>
                  <p className="opacity-95">Click on the map to set the location of your laundry shop</p>
                </div>
                <div className="flex flex-col px-6 mb-8 w-full space-y-3">
                  <InputTextField 
                    labelName="Address"
                    formikFieldName="laundryLocation_address"
                    propError={errors.laundryLocation_address}
                    propTouched={touched.laundryLocation_address}
                    values={values.laundryLocation_address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex flex-col space-y-1 w-full"
                  />
                
                  <div className="flex flex-row space-x-6">
                    <InputNumberField
                      labelName="Longitude"
                      formikFieldName="laundryLocation_lng"
                      propError={errors.laundryLocation_lng}
                      propTouched={touched.laundryLocation_lng}
                      values={values.laundryLocation_lng}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="flex flex-col space-y-1"
                      max="180"
                      min="-180"
                    
                    />   
                    <InputNumberField
                      labelName="Latitude"
                      formikFieldName="laundryLocation_lat"
                      propError={errors.laundryLocation_lat}
                      propTouched={touched.laundryLocation_lat}
                      values={values.laundryLocation_lat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="flex flex-col space-y-1"
                      max="90"
                      min="-90"
                    />   
                  </div>
                </div>
                <div className="h-[400px] m-0 p-0">
                    <Map
                      {...viewState}
                      onMove={((evt) => setViewState(evt.viewState))}
                      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                      style={{width: '100%', height: '100%'}}
                      attributionControl={false}
                      onClick={handleMapClick}
                      mapStyle="mapbox://styles/talipapa/clrdjnb5u003501r7ee503jpj"
                      doubleClickZoom={false}
                    >
                      {values.laundryLocation_lat !== 0 && values.laundryLocation_lng !== 0 ? (
                        <Marker longitude={values.laundryLocation_lng} latitude={values.laundryLocation_lat} anchor="center" draggable={true} onDrag={handleMapClick}/>
                      ) : null}

                      </Map>
                </div>
              </div>
              <div>
                <div className="px-6 mb-3">
                  <h3 className="opacity-60">Step 2</h3>
                  <h2 className="text-lg font-bold">Website contact info</h2>
                  <p className="opacity-95">Click on the map to set the location of your laundry shop</p>
                </div>
                <div className="px-6 mb-8 flex flex-row space-x-6">
                  <InputTextField 
                      labelName="Email"
                      formikFieldName="laundryLocation_email"
                      propError={errors.laundryLocation_email}
                      propTouched={touched.laundryLocation_email}
                      values={values.laundryLocation_email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="flex flex-col space-y-1 w-full"
                    />
                  <InputTextField 
                      labelName="Phone number"
                      formikFieldName="laundryLocation_phone"
                      propError={errors.laundryLocation_phone}
                      propTouched={touched.laundryLocation_phone}
                      values={values.laundryLocation_phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="flex flex-col space-y-1 w-full"
                    />
                </div>
     
              </div>
                
        
            </div>
          </div>

          <Button type="submit" className="mx-6 bg-[#F9844A] text-white font-bold py-3 rounded-lg" disabled={!isValid}>Claim ownership</Button>
        </form>


      </div>
    </div>
  )
}

export default AdminSetup