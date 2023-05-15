import React from 'react'
import { Grid } from '@mui/material'
import './css/gasDataCard.css'

function InfoCard() {
  return (
      <div className='parentContainer'>
          <div className="container">
              <div className="wrapper">
                <Grid container>
                    <Grid item xs={7}>
                          <p className="info_point">Good Air</p>
                    </Grid>
                    <Grid item xs={5}>
                          <p className="info_point">0 to 50 PPM</p>
                    </Grid>
                    <Grid item xs={7}>
                          <p className="info_point">Moderate Air</p>
                    </Grid>
                    <Grid item xs={5}>
                          <p className="info_point">51-100 PPM</p>
                    </Grid>
                    <Grid item xs={7}>
                          <p className="info_point">Unhealthy</p>
                    </Grid>
                    <Grid item xs={5}>
                          <p className="info_point">101-250 PPM</p>
                    </Grid>
                    <Grid item xs={7}>
                          <p className="info_point">Very Unhealthy</p>
                    </Grid>
                    <Grid item xs={5}>
                          <p className="info_point">251-350 PPM</p>
                    </Grid>
                    <Grid item xs={7}>
                          <p className="info_point">Hazardous</p>
                    </Grid>
                    <Grid item xs={5}>
                          <p className="info_point">351+ PPM</p>
                    </Grid>
                </Grid>
              </div>
          </div>
      </div>
  )
}

export default InfoCard