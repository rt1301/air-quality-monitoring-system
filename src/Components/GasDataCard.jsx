import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './css/temp.css';
import { Box } from '@mui/material';

const pollutedAir = "https://images.unsplash.com/photo-1499856678450-02322b3f03be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80"

const cleanAir = "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"


function GasDataCard({val}) {

    const [gasValue, setGasValue] = useState(0);

    useEffect(() => {
        fetchGasValue();
    }, [])
    
    

    const fetchGasValue = async () => {
        try {
            const res = await axios.get("https://blr1.blynk.cloud/external/api/get?token=fjKm-hTPsySPxRo1RrWIo6qwzogruKLC&V2");

            setGasValue(res.data);
        } catch (error) {
            console.log(error);
        }
    }
  return (
      <Box>
          <div class="card-hover">
              <div class="card-hover__content">
                  <h3 class="card-hover__title">
                      Air <span>Quality</span> Index
                  </h3>
                  <p style={{ textAlign: "center" }} class="card-hover__text">
                      {val ? val : ((gasValue*1023)/100)} PPM
                </p>
              </div>
              <img src={gasValue < 40 ? cleanAir : pollutedAir} alt="" />
          </div>
      </Box>
  )
}

export default GasDataCard