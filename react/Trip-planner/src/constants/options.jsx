

import {
  User,
  Users,
  Home,
  UsersRound,
  Wallet,
  Coins,
  Gem
} from 'lucide-react';

export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: 'A sole traveles in exploration',
    icon: User,
    people: '1'
  },
  {
    id: 2,
    title: "A couple",
    desc: 'Two traveles in tandem',
    icon: Users,
    people: '2 People'
  },
  {
    id: 3,
    title: "Family",
    desc: 'A group of fun loving adventure',
    icon: Home,
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: "Friends",
    desc: 'A group of fun loving adventure',
    icon: UsersRound,
    people: '2 to 4 People'
  }
]

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheapest",
    desc: 'Stay conscious of costs',
    icon: Wallet,
  },
  {
    id: 2,
    title: "Moderate",
    desc: 'Keep cost on the average side',
    icon: Coins,
  },
  {
    id: 3,
    title: "Luxurious",
    desc: 'Dont worry about the cost',
    icon: Gem,
  },
]


export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {days} Days for {traveler} with a {budget} budget, give me Hotels options list with hotelName, hotelAddress, price, hotelImageUrl, geoCoordinates, rating, description and suggest itinerary with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, timeTravel, bestTimeToVisit, in JSON format.
  
  One JSON object with two fields:
  1. "hotelOptions": an array of objects.
  2. "itinerary": an object containing a "days" array, where each element represents a day with "day", "theme", and "plan" (array of places).
  
  Example Output:
  {
    "hotelOptions": [
      {
        "hotelName": "Example Hotel",
        "hotelAddress": "Example Address",
        "price": "$100",
        "hotelImageUrl": "url",
        "geoCoordinates": { "latitude": 1.23, "longitude": 4.56 },
        "rating": 4.5,
        "description": "desc"
      }
    ],
    "itinerary": {
      "days": [
        {
          "day": 1,
          "theme": "Exploration",
          "plan": [
            {
              "placeName": "Place 1",
              "placeDetails": "Details",
              "placeImageUrl": "url",
              "geoCoordinates": { "latitude": 1.23, "longitude": 4.56 },
              "ticketPricing": "$10",
              "timeTravel": "2 hours",
              "bestTimeToVisit": "Morning"
            }
          ]
        },
        {
          "day": 2,
          "theme": "Adventure",
          "plan": [
            {
              "placeName": "Place 2",
              "placeDetails": "Details",
              "placeImageUrl": "url",
              "geoCoordinates": { "latitude": 1.23, "longitude": 4.56 },
              "ticketPricing": "$10",
              "timeTravel": "2 hours",
              "bestTimeToVisit": "Morning"
            }
          ]
        }
      ]
    }
  }
  `;


