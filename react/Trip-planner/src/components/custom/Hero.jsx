import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
function Hero() {
    return (
        <div className='flex flex-col items-center mx-32 gap-9'>
            <h1 className='font-extrabold text-[60px] text-center mt-16'>
                <span className='text-[#f55514]'>
                    Discover Your Next Adventure with Heavenly: Personalized ltineraries at your Fingertips
                </span>
            </h1>
            <p className='text-xl text-grey-500 text-center '>
                Heavenly is an AI-powered trip planner that creates personalized itineraries for your next adventure. Whether you're planning a solo trip, a romantic getaway, or a family vacation, Heavenly has got you covered.
            </p>
            <Link to={'/create-trip'}>
                <Button>Get Started</Button>
            </Link>
        </div>
    )
}

export default Hero