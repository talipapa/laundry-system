import { LaundryLocationSchema } from '@/Schema/AdminSetupSchema'
import { Toaster } from '@/shadcn/ui/toaster'
import { useToast } from '@/shadcn/ui/use-toast'
import { router } from '@inertiajs/react'
import React, { useState } from 'react'
import { InputNumberField, InputTextField } from '../InputCustomFields'
import { Button } from '@/shadcn/ui/button'
import { useFormik } from 'formik'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';


const CoordinatesInformation = ({webSettings}: any) => {
    const {toast} = useToast()

    const {values, errors, touched, handleSubmit, handleBlur, handleChange, setValues, setFieldValue, setFieldTouched, isValid} = useFormik({
        initialValues: {
            longitude: webSettings?.shop_longitude ?? 0,
            latitude: webSettings?.shop_latitude ?? 0,
        },
        validationSchema: LaundryLocationSchema,
        onSubmit: (values) => {
            router.put(route('admin.web-settings.coordinates'), values,{
                preserveState: true,
                onStart: () => {
                    setIsDisabledButton(true)
                },
                onSuccess: () => {
                    setIsDisabledButton(false)
                    toast({title: 'Successfully saved', variant: 'success'})
                },
                onError: (e) => {
                    console.log(e)
                    setIsDisabledButton(false)
                    toast({title: 'Error', description: "Something went wrong", variant: 'destructive'})
                },
                onFinish: () => {
                    setIsDisabledButton(false)
                }
            })
            console.log(values)
        }
    })
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)

    const [viewState, setViewState] = React.useState({
        latitude: values.latitude,
        longitude: values.longitude,
        zoom: 12,
    })

    const handleMapClick = (e: any) => {
    const {lng, lat} = e.lngLat
    setFieldValue('latitude', lat)
    setFieldValue('longitude', lng)
    }

    return (
        <form onSubmit={handleSubmit} className='w-full bg-white  dark:bg-[#2E2C2C] rounded-md p-6 dark:text-white'>
            <h2 className='text-lg mb-3'>Coordinates</h2>
            <div className='flex flex-col items-start space-y-3'>

                <div className="flex flex-row space-x-6">
                    <InputNumberField
                        labelName="Longitude"
                        formikFieldName="longitude"
                        propError={errors.longitude}
                        propTouched={touched.longitude}
                        values={values.longitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="flex flex-col space-y-1"
                        max="180"
                        min="-180"
                    
                    />   
                    <InputNumberField
                        labelName="Latitude"
                        formikFieldName="latitude"
                        propError={errors.latitude}
                        propTouched={touched.latitude}
                        values={values.latitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="flex flex-col space-y-1"
                        max="90"
                        min="-90"
                    />   
                </div>

                <div className="h-[400px] w-full m-0 p-0">
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
                      {values.latitude !== 0 && values.latitude !== 0 ? (
                        <Marker longitude={values.longitude} latitude={values.latitude} anchor="center" draggable={true} onDrag={handleMapClick}/>
                      ) : null}

                      </Map>
                </div>

                
                <Button type="submit" className="py-2 rounded-md" disabled={!isValid || isDisabledButton}>Save</Button>
            </div>
            <Toaster/>
        </form>
    )
}

export default CoordinatesInformation