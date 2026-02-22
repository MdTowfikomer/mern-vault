import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import placeholder from '@/assets/placeholder.png'
import { getPlaceDetails } from '@/service/GlobalApi'

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState(placeholder);

    useEffect(() => {
        hotel?.hotelName && GetPlaceImage();
    }, [hotel])

    const GetPlaceImage = async () => {
        try {
            const result = await getPlaceDetails(hotel?.hotelName + " hotel");
            const fetchedPhotoUrl = result.data.results[0]?.urls?.regular;
            setPhotoUrl(fetchedPhotoUrl || placeholder);
        } catch (error) {
            console.error("Error fetching hotel image:", error);
        }
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl} className='rounded-xl h-[180px] w-full object-cover' alt={hotel?.hotelName} />
                <div className="my-2 flex flex-col gap-2">
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>{hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'> {hotel?.price}</h2>
                    <h2 className='text-sm'> {hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem
