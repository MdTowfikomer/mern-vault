import InfoSection from './components/infoSection';
import Hotels from './components/Hotel';
import { toast } from 'sonner';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function ViewTrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    const GetTripData = async () => {
        const tripData = localStorage.getItem('tripData');
        console.log("tripData: \n", tripData);
        if (tripData) {
            setTrip(JSON.parse(tripData));
        }
        else {
            toast.error('No trip Found!')
        }
    }
    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}
            <Hotels trip={trip} />
            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default ViewTrip;
