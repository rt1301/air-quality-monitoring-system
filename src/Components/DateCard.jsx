import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './css/gasDataCard.css'

function DateCard() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    setInterval(() => {
      updateTime();
    }, 1000);
  }, [])
  

  const updateTime = () => {
    setTime(new Date().toLocaleTimeString())
  }
  return (
    <>
          <div className='parentContainer'>
              <div className="container">
                  <div className="wrapper">
                      <p style={{ fontSize: "1.4rem" }} className='date'>Date: {new Date().toLocaleDateString()}</p>
                      <p style={{ fontSize: "1.4rem" }} className='time'>Time: {new Date().toLocaleTimeString()}</p>
                  </div>
              </div>
          </div>
    </>
      
  )
}

export default DateCard