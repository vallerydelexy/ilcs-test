'use client'

import React, { useState, useCallback } from 'react'
import ParkingMap from '../components/ParkingMap'
import BookingForm from '../components/BookingForm'
import BookingDetails from '../components/BookingDetails'

export default function ParkingManagementSystem() {
  const [parkingSpots, setParkingSpots] = useState([
    { id: 0, length: 5, width: 2.5, isOccupied: false },
    { id: 1, length: 5, width: 2.5, isOccupied: false },
    { id: 2, length: 6, width: 3, isOccupied: false },
    { id: 3, length: 6, width: 3, isOccupied: false },
    { id: 4, length: 7, width: 3.5, isOccupied: false },
    { id: 5, length: 7, width: 3.5, isOccupied: false },
    { id: 6, length: 5.5, width: 2.7, isOccupied: false },
    { id: 7, length: 5.5, width: 2.7, isOccupied: false },
    { id: 8, length: 6.5, width: 3.2, isOccupied: false },
    { id: 9, length: 6.5, width: 3.2, isOccupied: false },
  ])
  const [currentBooking, setCurrentBooking] = useState(null)
  const [filters, setFilters] = useState({ length: 0, width: 0 })

  const handleBooking = useCallback((booking) => {
    setParkingSpots(prevSpots => 
      prevSpots.map(spot =>
        spot.id === booking.spotId ? { ...spot, isOccupied: true } : spot
      )
    )
    setCurrentBooking(booking)
  }, [])

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters)
  }, [])

  const filteredSpots = parkingSpots.filter(
    spot => spot.length >= filters.length && spot.width >= filters.width && !spot.isOccupied
  )

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
          <BookingForm
            onBooking={handleBooking}
            parkingSpots={filteredSpots}
            onFilterChange={handleFilterChange}
          />
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

