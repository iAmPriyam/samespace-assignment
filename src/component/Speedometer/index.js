import React, { useState, useEffect } from 'react'
import './style.css'
import { range } from 'lodash'
import { polarToCartesian, initializeArc } from '../../util/functions'

const Speedometer = () => {
  const [speed, setSpeed] = useState(0)
  const marker = range(0, 221, 20)
  const markerSmall = range(0, 221, 2)
  const markerMedium = range(0, 221, 10)
  useEffect(() => {
    if (speed < 220) {
      setTimeout(() => {
        setSpeed(speed + 1)
      }, 1000)
    } else {
      setTimeout(() => {
        setSpeed(0)
      }, 1000)
    }
  }, [speed])
  return (
    <div className='canvas'>
      <svg width='600' height='600'>
        {marker.map((mark) => (
          <>
            <path
              className='large-divisions'
              key={mark}
              d={initializeArc(275, 275, 200, mark - 1, mark)}
              fill='none'
              strokeWidth='10'
            ></path>
            <text
              key={`${mark}-text`}
              x={`${polarToCartesian(275, 275, 170, mark, mark).x}`}
              y={`${polarToCartesian(275, 275, 170, mark, mark).y}`}
              fill='white'
              textAnchor='middle'
            >
              {mark}
            </text>
          </>
        ))}
        {markerMedium.map((coordinate) => (
          <>
            {!marker.includes(coordinate) ? (
              <>
                <path
                  className='small-divisions'
                  key={`medium-coordinate-${coordinate}`}
                  d={initializeArc(275, 275, 200, coordinate - 1, coordinate)}
                  fill='none'
                  strokeWidth='5'
                ></path>
              </>
            ) : null}
          </>
        ))}
        {markerSmall.map((coordinate) => (
          <>
            {!marker.includes(coordinate) ? (
              <>
                <path
                  className='small-divisions'
                  key={`small-coordinate-${coordinate}`}
                  d={initializeArc(275, 275, 200, coordinate - 1, coordinate)}
                  fill='none'
                  strokeWidth='2'
                ></path>
              </>
            ) : null}
          </>
        ))}
        <path
          className='dial pointer'
          d={initializeArc(275, 275, 230, speed, speed)}
          fill='none'
          strokeWidth='10'
        ></path>
        <path
          className='dial solid'
          d={initializeArc(275, 275, 230, speed)}
          fill='none'
          strokeWidth='10'
        ></path>
        <path
          className='dial'
          d={initializeArc(275, 275, 230, 220)}
          fill='none'
          strokeWidth='10'
        ></path>
        <path
          className='dial pointer'
          d={initializeArc(275, 275, 230, speed, speed)}
          fill='none'
          strokeWidth='10'
        ></path>
      </svg>

      <h2 className='speed'>
        {speed}
        <span>km/hr</span>
      </h2>
    </div>
  )
}

export default Speedometer
