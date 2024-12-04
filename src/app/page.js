'use client'

import React, { useState } from 'react'
import ParkingMap from '../components/ParkingMap'
import BookingForm from '../components/BookingForm'
import BookingDetails from '../components/BookingDetails'

export default function ParkingManagementSystem() {
  const [parkingSpots, setParkingSpots] = useState(Array(20).fill(false))
  const [currentBooking, setCurrentBooking] = useState(null)

  const handleBooking = (booking) => {
    const newParkingSpots = [...parkingSpots]
    newParkingSpots[booking.spotId] = true
    setParkingSpots(newParkingSpots)
    setCurrentBooking(booking)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Parking Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Parking Map</h2>
          <ParkingMap parkingSpots={parkingSpots} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Book a Parking Spot</h2>
          <BookingForm onBooking={handleBooking} parkingSpots={parkingSpots} />
        </div>
      </div>
      {currentBooking && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Current Booking</h2>
          <BookingDetails booking={currentBooking} />
        </div>
      )}
    </div>
  )
}

