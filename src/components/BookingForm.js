import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const BookingForm = ({ onBooking, parkingSpots }) => {
  const [name, setName] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [duration, setDuration] = useState(1)
  const [spotId, setSpotId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const booking = {
      name,
      vehicleNumber,
      duration,
      spotId: parseInt(spotId),
      startTime: new Date().toISOString(),
    }
    onBooking(booking)
    // Reset form
    setName('')
    setVehicleNumber('')
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
            {parkingSpots.map((isOccupied, index) => (
              !isOccupied && (
                <SelectItem key={index} value={index.toString()}>
                  Spot {index + 1}
                </SelectItem>
              )
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Book Parking Spot</Button>
    </form>
  )
}

export default BookingForm

