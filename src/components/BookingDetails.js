import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const BookingDetails = ({ booking }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Vehicle Number:</strong> {booking.vehicleNumber}</p>
        <p><strong>Vehicle Dimensions:</strong> {booking.vehicleLength}m x {booking.vehicleWidth}m</p>
        <p><strong>Parking Spot:</strong> {booking.spotId + 1}</p>
        <p><strong>Start Time:</strong> {new Date(booking.startTime).toLocaleString()}</p>
        <p><strong>Duration:</strong> {booking.duration} hour(s)</p>
      </CardContent>
    </Card>
  )
}

export default BookingDetails

