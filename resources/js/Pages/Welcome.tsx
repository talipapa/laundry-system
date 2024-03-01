import { Link, Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import CanvasRestriction from '@/Components/CanvasRestriction';
import { Parallax } from 'react-scroll-parallax';
import { GiWaterSplash } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";
import SectionHeader from '@/Components/SectionHeader';
import StarRatings from 'react-star-ratings';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import GuestNavbar from '@/Components/CustomerPartials/GuestNavbar';
import GuestPageLayout from '@/Components/CustomerPartials/GuestPageLayout';
import GuestFootbar from '@/Components/CustomerPartials/GuestFootbar';




export default function Welcome({ auth, webInfo, geoLocation, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {



    const [emblaRef, emblaApi] = useEmblaCarousel()
    const reviews: [] = webInfo['review']['reviewMessages']
    return (
        <GuestPageLayout>
            <Head title="Welcome" />
            {/* Header container */}
            <GuestNavbar webInfo={webInfo} auth={auth} currentTransaction={auth?.currentTransaction}/>

            {/* Hero container */}
            <div className='h-[100vh] max-h-[400px] w-full overflow-hidden z-[-5]'>
                <Parallax speed={-100} translateY={[-50, 10]}>
                    <img  src='/hero-landing.png' loading='lazy' className='h-full w-full object-cover xl:object-contain object-top'/>
                </Parallax>
            </div>

            {/* Main content container */}
            <div className='w-full bg-[#EEEEEE] py-24 flex flex-col items-center space-y-24'>
                {/* About us container */}
                <CanvasRestriction>
                    <SectionHeader className="items-center" subjectHeader="ABOUT US" titleHeader="WE CAN DO"/>
                    <div className='grid md:grid-cols-3 gap-2 xl:gap-12 w-full'>
                        <div className='p-8 bg-white shadow-xl w-full h-full rounded-2xl'>
                            <GiWaterSplash className='text-4xl text-orange-600'/>
                            <h4 className='text-2xl font-semibold mb-2 tracking-wider'>Laundry</h4>
                            <p className='text-sm xl:text-lg'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tincidunt odio, vel convallis nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas volutpat arcu a nulla efficitur, sit amet tempor nisl varius. Mauris vitae sapien tincidunt ex pretium facilisis et et metus. Sed non eros eu orci hendrerit lacinia
                            </p>
                        </div>
                        <div className='p-8 bg-white shadow-xl w-full h-full rounded-2xl'>
                            <GiClothes className='text-4xl text-orange-600'/>
                            <h4 className='text-2xl font-semibold mb-2 tracking-wider'>Ironing</h4>
                            <p className='text-sm xl:text-lg'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tincidunt odio, vel convallis nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas volutpat arcu a nulla efficitur, sit amet tempor nisl varius. Mauris vitae sapien tincidunt ex pretium facilisis et et metus. Sed non eros eu orci hendrerit lacinia
                            </p>
                        </div>
                        <div className='p-8 bg-white shadow-xl w-full h-full rounded-2xl'>
                            <GiRunningShoe className='text-4xl text-orange-600'/>
                            <h4 className='text-2xl font-semibold mb-2 tracking-wider'>Shoe cleaning</h4>
                            <p className='text-sm xl:text-lg'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tincidunt odio, vel convallis nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas volutpat arcu a nulla efficitur, sit amet tempor nisl varius. Mauris vitae sapien tincidunt ex pret
                                
                            </p>
                        </div>

                    </div>
                </CanvasRestriction>

                {/* Vlog container */}
                <CanvasRestriction className='w-full bg-[#EEEEEE] grid grid-cols-2 gap-12'>
                    <div>
                        <SectionHeader className="items-start" subjectHeader="VLOG" titleHeader="MONTALBAN LAUNDRY"/>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit vitae saepe corporis autem modi dolores provident facilis, nulla sequi vero magni consequatur tenetur dolorem sunt magnam placeat, recusandae quas officia. Blanditiis modi deserunt recusandae possimus necessitatibus. Quia, temporibus veniam ea impedit explicabo eius modi excepturi, aut natus autem iusto laudantium expedita quaerat ullam amet nemo rerum necessitatibus voluptatibus. Doloremque tempora deserunt aspernatur maiores libero optio vitae dolorum similique, accusantium non quod doloribus. Labore optio nemo rem dignissimos ipsam. Hic ipsum saepe corporis, fugit porro vitae fugiat quidem esse tempore ab suscipit obcaecati reiciendis? Ullam quam placeat officia aliquam ea numquam voluptatum, quibusdam, quia, voluptatem quos voluptate. Quisquam, quibusdam.
                        </p>

                    </div>
                    <div className='aspect-video'>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/MIKl8khLW9Y?si=NhA0Qw93BccpNELo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </CanvasRestriction>
            </div>

            <div className='w-full bg-[#ffffff] py-24 flex flex-col items-center space-y-7 shadow-xl'>
                <div className={`flex flex-col items-center space-y-1 w-full`}>
                    <StarRatings
                        rating={webInfo['review']['reviewAverage'] as number}
                        starRatedColor="#eeaf61"
                        starDimension="30px"
                        starSpacing="15px"
                    />
                    <h3 className='text-md text-[#F9844A] font-semibold'>REVIEWS</h3>
                </div>
                <CanvasRestriction>
                    <div className="embla w-full" ref={emblaRef}>
                        <div className="embla__container">
                            {
                                reviews.map((review, index) => (
                                    <div key={index} className='embla__slide bg-[#f1f1f1] rounded-lg shadow  mx-5 flex flex-col items-start p-6 space-y-3'>
                                        <div>
                                            <div>
                                                {review['fullName']}
                                            </div>
                                            <StarRatings
                                                rating={parseFloat(review['rating'])}
                                                starRatedColor="#eeaf61"
                                                starDimension="25px"
                                                starSpacing="5px"
                                            />
                                        </div>
                                        <div>
                                            {review['comment']}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </CanvasRestriction>
            </div>
            <div className='bg-[#f1f1f1] shadow-xl'>
                <CanvasRestriction className='w-full py-24 flex flex-col items-center space-y-7 '>
                    <div className='w-full relative flex flex-col items-center'>
                        <span className='text-4xl'>Clean and fresh laundry is just a click away</span>
                        <img src='/stars.svg' className='min-h-[90px] min-w-[0%] max-w-[70%] absolute top-0 mt-[-30px]'/>
                    </div>
                    
                    <button onClick={() => router.get(route('services'))} className='bg-[#F9844A] hover:bg-[#cf6f3f] w-[200px]  text-white p-4 rounded-full hover:shadow-lg ease-in-out duration-200'>Reserve now</button>
                </CanvasRestriction>
            </div>





            {/* Footer container */}
        <GuestFootbar webInfo={webInfo} geoLocation={geoLocation}/>

        </GuestPageLayout>
    );
}
