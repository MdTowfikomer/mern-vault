import React, { useEffect, useState } from 'react'
import placeholder from '@/assets/placeholder.png'
import { getPlaceDetails } from '@/service/GlobalApi'
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState(placeholder);

    useEffect(() => {
        place?.placeName && GetPlaceImage();
    }, [place])

    const GetPlaceImage = async () => {
        try {
            const result = await getPlaceDetails(place?.placeName);
            const fetchedPhotoUrl = result.data.results[0]?.urls?.regular;
            setPhotoUrl(fetchedPhotoUrl || placeholder);
        } catch (error) {
            console.error("Error fetching place image:", error);
        }
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 mr-2 hover:scale-101 transition-all cursor-pointer hover:shadow-md'>
                <img src={photoUrl}
                    className='w-[130px] h-[130px] rounded-xl object-cover'
                    alt={place?.placeName}
                />
                <div>
                    <h2 className='font-bold text-lg'>{place?.placeName}</h2>
                    <h2 className='text-sm text-gray-400'>{place?.placeDetails}</h2>
                    <h2 className='mt-2'>{place?.ticketPricing}</h2>
                    <p className='mt-2'>{place?.timeTravel}</p>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem    