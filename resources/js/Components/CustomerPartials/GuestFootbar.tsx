import React, { useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl'
import { MdEmail } from 'react-icons/md';
import { FaPhoneSquareAlt } from 'react-icons/fa';

const GuestFootbar = ({webInfo, geoLocation}: any) => {
    const [viewState, setViewState] = useState({
        latitude: geoLocation['latitude'] as number,
        longitude: geoLocation['longitude'] as number,
        zoom: 12,
    })
  return (
    

    <div className='w-full bg-[#131313] text-white h-[600px] grid grid-cols-2 shadow-xl'>
        <div className='w-full h-full'>
            <Map
                {...viewState}
                onMove={((evt) => setViewState(evt.viewState))}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                style={{width: '100%', height: '100%'}}
                attributionControl={false}
                mapStyle="mapbox://styles/talipapa/clrdjnb5u003501r7ee503jpj"
                doubleClickZoom={false}
                >
                {geoLocation['latitude'] !== 0 && geoLocation['longitude'] !== 0 ? (
                    <Marker longitude={geoLocation['longitude']} latitude={geoLocation['latitude']} anchor="center"/>
                ) : null}

            </Map>
        </div>
        <div className='p-10 flex flex-col justify-between'>
            <div className='flex flex-col space-y-8'>
                <div className='flex flex-col space-y-2'>
                    <div>
                        <h3 className='text-xl text-[#F9844A] font-semibold'>VISIT US</h3>
                        <span>{geoLocation['merchantAddress']}</span>
                    </div>

                    <div className='text-lg flex-col '>
                        <div className='flex flex-row space-x-3 items-center'>
                            <MdEmail/>
                            <span>{webInfo['merchantEmail']}</span>
                        </div>
                        <div className='flex flex-row space-x-3 items-center'>
                            <FaPhoneSquareAlt/>
                            <span>{webInfo['merchantPhoneNumber']}</span>
                        </div>
                    </div>
                </div>
                {/* <div className='flex flex-col space-y-2'>
                    <div>
                        <h3 className='text-xl text-[#F9844A] font-semibold'>REACH US</h3>
                        
                    </div>
                </div> */}
            </div>
        
        </div>
    </div>
  )
}

export default GuestFootbar