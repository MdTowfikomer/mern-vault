import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-lg'>Places To Visit</h2>
            <div className='mt-5'>
                {trip?.tripData?.itinerary?.days?.map((day, index) => (
                    <div key={index} className='mt-5'>
                        <h2 className='font-medium text-lg text-primary'>Day {day?.day}</h2>
                        <div className='grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
                            {day?.plan?.map((place, index) => (
                                <div key={index}>
                                    <h2 className='font-medium text-sm text-orange-600'>{place.bestTimeToVisit}</h2>
                                    <PlaceCardItem place={place} />
                                </div>      
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit