import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const BookingForm = ({ onBooking, parkingSpots, onFilterChange }) => {
  const [name, setName] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [vehicleLength, setVehicleLength] = useState('')
  const [vehicleWidth, setVehicleWidth] = useState('')
  const [duration, setDuration] = useState(1)
  const [spotId, setSpotId] = useState('')

  const debouncedFilterChange = useCallback(
    debounce((length, width) => {
      onFilterChange({
        length: parseFloat(length) || 0,
        width: parseFloat(width) || 0
      })
    }, 300),
    [onFilterChange]
  )

  useEffect(() => {
    debouncedFilterChange(vehicleLength, vehicleWidth)
  }, [vehicleLength, vehicleWidth, debouncedFilterChange])

  const handleSubmit = (e) => {
    e.preventDefault()
    const booking = {
      name,
      vehicleNumber,
      vehicleLength: parseFloat(vehicleLength),
      vehicleWidth: parseFloat(vehicleWidth),
      duration,
      spotId: parseInt(spotId),
      startTime: new Date().toISOString(),
    }
    onBooking(booking)
    // Reset form
    setName('')
    setVehicleNumber('')
    setVehicleLength('')
    setVehicleWidth('')
    setDuration(1)
    setSpotId('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="vehicleNumber">Vehicle Number</Label>
        <Input
          id="vehicleNumber"
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="vehicleLength">Vehicle Length (m)</Label>
        <Input
          id="vehicleLength"
          type="number"
          step="0.1"
          min="0"
          value={vehicleLength}
          onChange={(e) => setVehicleLength(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="vehicleWidth">Vehicle Width (m)</Label>
        <Input
          id="vehicleWidth"
          type="number"
          step="0.1"
          min="0"
          value={vehicleWidth}
          onChange={(e) => setVehicleWidth(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration (hours)</Label>
        <Input
          id="duration"
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="spotId">Parking Spot</Label>
        <Select value={spotId} onValueChange={setSpotId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a parking spot" />
          </SelectTrigger>
          <SelectContent>
            {parkingSpots.map((spot) => (
              <SelectItem key={spot.id} value={spot.id.toString()}>
                Spot {spot.id + 1} ({spot.length}m x {spot.width}m)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Book Parking Spot</Button>
    </form>
  )
}

// Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default BookingForm

