import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'

const ParkingMap = ({ parkingSpots }) => {
  const maxSpotSize = Math.max(...parkingSpots.map(spot => Math.max(spot.length, spot.width)))
  const scale = 100 / maxSpotSize
  const padding = 10

  const stageWidth = Math.ceil(Math.sqrt(parkingSpots.length)) * (maxSpotSize * scale + padding)
  const stageHeight = Math.ceil(parkingSpots.length / Math.ceil(Math.sqrt(parkingSpots.length))) * (maxSpotSize * scale + padding)

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Layer>
        {parkingSpots.map((spot, index) => {
          const row = Math.floor(index / Math.ceil(Math.sqrt(parkingSpots.length)))
          const col = index % Math.ceil(Math.sqrt(parkingSpots.length))
          const x = col * (maxSpotSize * scale + padding)
          const y = row * (maxSpotSize * scale + padding)

          return (
            <React.Fragment key={spot.id}>
              <Rect
                x={x}
                y={y}
                width={spot.length * scale}
                height={spot.width * scale}
                fill={spot.isOccupied ? '#FF6B6B' : '#4ECB71'}
                stroke="#333"
                strokeWidth={1}
              />
              <Text
                x={x}
                y={y}
                width={spot.length * scale}
                height={spot.width * scale}
                text={`${spot.id + 1}\n${spot.length}x${spot.width}`}
                fontSize={12}
                fontFamily="Arial"
                fill="#FFF"
                align="center"
                verticalAlign="middle"
              />
            </React.Fragment>
          )
        })}
      </Layer>
    </Stage>
  )
}

export default ParkingMap

