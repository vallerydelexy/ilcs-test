import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'

const ParkingMap = ({ parkingSpots }) => {
  const spotSize = 50
  const spotsPerRow = 5

  return (
    <Stage width={spotSize * spotsPerRow} height={spotSize * Math.ceil(parkingSpots.length / spotsPerRow)}>
      <Layer>
        {parkingSpots.map((isOccupied, index) => {
          const x = (index % spotsPerRow) * spotSize
          const y = Math.floor(index / spotsPerRow) * spotSize

          return (
            <React.Fragment key={index}>
              <Rect
                x={x}
                y={y}
                width={spotSize}
                height={spotSize}
                fill={isOccupied ? '#FF6B6B' : '#4ECB71'}
                stroke="#333"
                strokeWidth={1}
              />
              <Text
                x={x}
                y={y}
                width={spotSize}
                height={spotSize}
                text={(index + 1).toString()}
                fontSize={16}
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

