import React, { useEffect, useState } from 'react'
import { Input } from '../components/ui/input'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { chatSession } from '@/service/model';

function CreateTrip() {
    const [place, setPlace] = useState('');
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    const OnGenerateTrip = async () => {
        if (formData?.days > 5 || !formData?.location || !formData?.budget || !formData?.traveler) {
            toast.error("Please enter all the fields");
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location)
            .replace('{days}', formData?.days)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{days}', formData?.days)

        // console.log(FINAL_PROMPT);

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        setLoading(false);
        SaveTrip(result?.response?.text());
    }

    const SaveTrip = async (TripData) => {
        setLoading(true);
        const user = localStorage.getItem('user');
        const docId = Date.now().toString();

        let parsedData;
        try {
            // Remove markdown code blocks if present
            const cleanData = TripData.replace(/```json/g, '').replace(/```/g, '');
            parsedData = JSON.parse(cleanData);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            toast.error("Failed to generate valid trip data. Please try again.");
            setLoading(false);
            return;
        }

        await localStorage.setItem('tripData', JSON.stringify({
            userSelection: formData,
            tripData: parsedData,
            user: user,
            id: docId
        }));

        setLoading(false);
        navigate('/view-trip/' + docId);
    }
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us Your travel preferences</h2>
            <p className='text-grey-500 mt-3 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div>
                <div className='mt-10 flex flex-col gap-10'>
                    <div>
                        <h2 className='text-xl my-3 font-medium'>What is destination?</h2>
                        <Input name="location" type="text" placeholder='Enter destination' value={place} onChange={(e) => { setPlace(e.target.value); handleInputChange('location', e.target.value) }} />
                    </div>
                    <div>
                        <h2 className='text-xl my-3 font-medium'>How many days are you planning to stay?</h2>
                        <Input name="days" type="number" placeholder='Enter days' onChange={(e) => { handleInputChange('days', e.target.value) }} />
                    </div>
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((option) => (
                            <div key={option.id}
                                onClick={() => handleInputChange('budget', option.title)}
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
                            ${formData.budget == option.title ? 'shadow-lg border-black' : ''}`}>
                                <option.icon className='h-8 w-8 my-3' />
                                <h2 className='text-xl my-3 font-bold'>{option.title}</h2>
                                <p className='text-grey-500 mt-3 text-sm'>{option.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan on trvaveling with on your next adventure?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelsList.map((option) => (
                            <div key={option.id}
                                onClick={() => handleInputChange('traveler', option.people)}
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
                            ${formData.traveler == option.people ? 'shadow-lg border-black' : ''}`}>
                                <option.icon className='h-8 w-8 my-3' />
                                <h2 className='text-xl my-3 font-bold'>{option.title}</h2>
                                <p className='text-grey-500 mt-3 text-sm'>{option.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='my-10 justify-end flex'>
                <Button
                    disabled={loading}
                    onClick={OnGenerateTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
                    }
                </Button>
            </div>
        </div>

    )
}


export default CreateTrip; 