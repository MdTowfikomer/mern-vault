import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import placeholder from '@/assets/placeholder.png'
import { getPlaceDetails } from '@/service/GlobalApi'

function InfoSection({ trip }) {
    // usestate for photo url
    const [photoUrl, setPhotoUrl] = useState(placeholder);

    useEffect(() => {
        trip?.userSelection?.location && GetPlaceImage();
    }, [trip])

    const GetPlaceImage = async () => {
        try {
            const result = await getPlaceDetails(trip?.userSelection?.location);
            const fetchedPhotoUrl = result.data.results[0]?.urls?.regular;
            setPhotoUrl(fetchedPhotoUrl || placeholder);
        } catch (error) {
            console.error("Error fetching place image:", error);
        }
    }
    return (
        <div className='relative'>
            <img src={photoUrl} className='rounded-xl h-[340px] w-full object-cover' />

            <div className='flex justify-around items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>Trip to {trip?.userSelection?.location}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.days} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.traveler} Travelers</h2>

                    </div>
                </div>
                <Button>Share Trip</Button>
            </div>
        </div>
    )
}

export default InfoSection



//<div className='p-10 md:px-20 lg:px-44 xl:px-56'>
//             {/* Information Section */}
//             <div>
//                 <h2 className='font-bold text-2xl'>Trip to {trip?.userSelection?.location}</h2>
//                 <p>Days: {trip?.userSelection?.days}</p>
//                 <p>Budget: {trip?.userSelection?.budget}</p>
//             </div>
//             {/* Recommended Hotels */}
//             <div className='mt-10'>
//                 <h2 className='font-bold text-xl mb-5'>Hotel Recommendation</h2>
//                 <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
//                     {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
//                         <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
//                             <img src="/placeholder.jpg" className='rounded-xl h-[180px] w-full object-cover' />
//                             <div className='my-2 flex flex-col gap-2'>
//                                 <h2 className='font-medium'>{hotel?.hotelName}</h2>
//                                 <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
//                                 <h2 className='text-sm'>💰 {hotel?.price}</h2>
//                                 <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {/* Daily Plan */}
//             <div className='mt-10'>
//                 <h2 className='font-bold text-xl mb-5'>Daily Plan</h2>
//                 <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
//                     {trip?.tripData?.travelPlan?.itinerary?.map((day, index) => (
//                         <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
//                             <img src="/placeholder.jpg" className='rounded-xl h-[180px] w-full object-cover' />
//                             <div className='my-2 flex flex-col gap-2'>
//                                 <h2 className='font-medium'>{day?.theme}</h2>
//                                 <h2 className='text-xs text-gray-500'>📍 {day?.plan[0]?.placeName}</h2>
//                                 <h2 className='text-sm'>💰 {day?.plan[0]?.ticketPricing}</h2>
//                                 <h2 className='text-sm'>⭐ {day?.plan[0]?.bestTimeToVisit}</h2>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {/* Footer */}
//         </div>