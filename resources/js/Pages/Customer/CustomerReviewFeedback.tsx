import CanvasRestriction from '@/Components/CanvasRestriction'
import GuestFootbar from '@/Components/CustomerPartials/GuestFootbar'
import GuestNavbar from '@/Components/CustomerPartials/GuestNavbar'
import GuestPageLayout from '@/Components/CustomerPartials/GuestPageLayout'
import { FeedbackSchema } from '@/Schema/CustomerFeedbackSchema'
import { Alert, AlertDescription, AlertTitle } from '@/shadcn/ui/alert'
import { Button } from '@/shadcn/ui/button'
import { PageProps } from '@/types'
import { Head, router } from '@inertiajs/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'

const CustomerReviewFeedback = ({webInfo, auth, currentTransaction, geoLocation}: PageProps) => {
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
    const {values, errors, touched, handleSubmit, handleBlur, handleChange, setValues, setFieldValue, setFieldTouched, setErrors, isValid} = useFormik({
        initialValues: {
            user_id: auth.user.id,
            rating: 0,
            message: '',
        },
        validationSchema: FeedbackSchema,
        onSubmit: (values) => {
          router.post(route('customer.review-make'), values, {
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
    console.log(errors)
  return (
    <GuestPageLayout>
        <Head title="Make a review" />
        {/* Header container */}
        <GuestNavbar webInfo={webInfo} auth={auth} currentTransaction={currentTransaction}/>

        <div className='w-full bg-[#EEEEEE] py-12 flex flex-col items-center space-y-24'>
            {/* Main content container */}
            <CanvasRestriction className='min-h-[100vh]'>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-3xl font-semibold'>We'd love to hear your opinion!</h2>
                    {Object.values(errors).length > 0 ? (
                        <Alert variant="destructive" className='w-[70%] my-4'>
                            <AlertTitle>Field errors !</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {
                                    Object.values(errors).map((messageError) => (
                                        <li>
                                            {`- ${messageError}`}
                                        </li>
                                    ))
                                    }
                                </ul>
                            </AlertDescription>
                        </Alert>
                    ) : null}
                    <form onSubmit={handleSubmit} className='mt-4 w-[70%] flex flex-col items-center space-y-4'>
                        <div className='flex flex-col space-y-2 items-center '>
                            <StarRatings
                                rating={values.rating}
                                changeRating={(e) => setFieldValue('rating', e)}
                                starRatedColor="#eeaf61"
                                starDimension="25px"
                                starSpacing="5px"
                            />
                            <span className='text-slate-500 text-sm'>{`( ${values.rating} )`}</span>
                        </div>
                        <textarea name="message" id="message" className='w-full p-4' rows={5} onChange={handleChange} onBlur={handleBlur}/>
                        <Button type='submit' disabled={!isValid || isDisabledButton}>Submit</Button>

                    </form>
                </div>
            </CanvasRestriction>
        </div>
        {/* Footer container */}
        <GuestFootbar webInfo={webInfo} geoLocation={geoLocation}/>
    </GuestPageLayout>
  )
}

export default CustomerReviewFeedback