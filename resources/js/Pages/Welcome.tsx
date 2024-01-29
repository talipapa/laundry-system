import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import CanvasRestriction from '@/Components/CanvasRestriction';
import { Parallax } from 'react-scroll-parallax';
import { GiWaterSplash } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";
import SectionHeader from '@/Components/SectionHeader';
import StarRatings from 'react-star-ratings';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';




export default function Welcome({ auth, webInfo, geoLocation, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {

    const [emblaRef, emblaApi] = useEmblaCarousel()
    
    const reviews: [] = webInfo['review']['reviewMessages']
    useEffect(() => {
        if (emblaApi) {
        console.log(emblaApi.slideNodes()) // Access API
        }
    }, [emblaApi])
    return (
        <div className='xl:min-h-[400px] flex flex-col justify-between'>
            <Head title="Welcome" />
            {/* Header container */}
            <div className='sticky top-0 z-[100]'>
                {/* Notification navbar */}
                <div className={`w-full h-[60px] bg-[rgb(249,132,74)]`}>
                    <CanvasRestriction className="flex flex-col items-center justify-center">
                        <span className='font-semibold text-xl select-none'>FIRST OPENING 60% OFF 🎉🎉🎉</span>
                    </CanvasRestriction>
                </div>

                {/* Navbar */}
                <div className={`w-full h-[90px] bg-[#131313]`}>
                    <CanvasRestriction className="flex flex-row items-center justify-between">
                        <h1 className='text-[#F9844A] text-xl font-semibold'>{webInfo['websiteName']}</h1>
                        
                        <div className='flex flex-row space-x-6'>
                            <Link href='/' className="text-white hover:text-[#F9844A]">Home</Link>
                            <Link href='/services' className="text-white hover:text-[#F9844A]">Services</Link>
                            <Link href='/services' className="text-white hover:text-[#F9844A]">About us</Link>
                            <Link href='/services' className="text-white hover:text-[#F9844A]">Contact us</Link>

                        </div>


                        <div className='flex flex-row space-x-6'>
                            <Link href={route('login')} className="text-white hover:text-[#F9844A]">Login</Link>
                            <Link href={route('register')} className="text-white hover:text-[#F9844A]">Register</Link>
                        </div>
                        
                        
                        

                    </CanvasRestriction>
                </div>
            </div>

            {/* Hero container */}
            <div className='h-[400px] w-full overflow-hidden z-[-5]'>
                <Parallax speed={-100} translateY={[-50, 5]}>
                    <img  src='/hero-landing.png' className='h-full w-full object-cover xl:object-contain object-top'/>
                </Parallax>
            </div>

            {/* Main content container */}
            <div className='w-full bg-[#EEEEEE] py-10 flex flex-col items-center space-y-16'>
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

            <div className='w-full bg-[#ffffff] py-10 flex flex-col items-center space-y-7 shadow-xl'>
                <div className={`flex flex-col items-center space-y-2 w-full`}>
                    <h3 className='text-md text-[#F9844A] font-semibold'>REVIEWS</h3>
                    <StarRatings
                        rating={webInfo['review']['reviewAverage'] as number}
                        starRatedColor="#eeaf61"
                        starDimension="40px"
                        starSpacing="15px"
                    />
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

            {/* Footer container */}
            <div className={`w-full h-[250px] bg-[#131313]`}>
                <CanvasRestriction>


                </CanvasRestriction>
            
            </div>

        </div>
    );
}
