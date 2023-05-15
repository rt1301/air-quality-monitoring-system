import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Box } from '@mui/material'
import './css/temperatureCard.css';

function TemperatureCard({ val }) {
    const [temperatureVal, setTemperatureVal] = useState(0);

    useEffect(() => {
        fetchTemperatureVal();
    }, [])


    const fetchTemperatureVal = async () => {
        try {
            const res = await axios.get("https://blr1.blynk.cloud/external/api/get?token=fjKm-hTPsySPxRo1RrWIo6qwzogruKLC&V3");

            setTemperatureVal(res.data);

            // console.log("TEMPERATURE: ", res.data);

        } catch (error) {
            console.log(error);
        }
    }
    const imgUri = "https://images.unsplash.com/photo-1586194483662-d84a7a2deba1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  return (
      <Box>
          <div class="temp_card-hover">
              <div class="temp_card-hover__content">
                  <h3 class="temp_card-hover__title">
                      Temperature
                  </h3>
                  <p style={{ textAlign: "center" }} class="temp_card-hover__text">
                      {val ? val : temperatureVal} ℃
                  </p>
              </div>
              <img src={imgUri} alt="" />
          </div>
      </Box>
  )
}

export default TemperatureCard