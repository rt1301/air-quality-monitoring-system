import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Container, Grid, CircularProgress } from '@mui/material'
import GasDataCard from './GasDataCard'
import InfoCard from './InfoCard'
import DateCard from './DateCard'
import TemperatureCard from './TemperatureCard'
import './css/dashboard.css';

function Dashboard() {

    const [temp, setTemp] = useState(null);
    const [ppm, setPPM] = useState(null);
    const [coord, setCoord] = useState({ lat: 10.75911, lng: 78.8132 })

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    });
    const center = useMemo(() => ({ lat: 10.75911, lng: 78.8132 }), []);
    useEffect(() => {
        const id = setInterval(() => {
            fetchCurrentData();
        }, 5000);

        return () => {
            clearInterval(id);
        }
    }, [])
    const fetchCurrentData = async () => {
        try {
            const res = await axios.get("https://api-airquality-nitt.onrender.com/api/getLatestVal")
            const doc = res.data;
            if (doc.code === 200) {
                const { airData } = doc.data[0];
                const { gas, temperature, latitude, longitude } = airData;
                let gasValue = ((gas * 1023) / 100).toFixed(3)
                setCoord({
                    lat: latitude,
                    lng: longitude
                });
                if(gas>=35){
                    toast('Unhealthy Air',
                        {
                            icon: <span>&#9785;</span>,
                            style: {
                                background: '#e33b41',
                                color: '#fff',
                                fontWeight: "bold"
                            },
                        }
                    );
                }
                setPPM(gasValue);
                setTemp(temperature);
            }
        } catch (error) {
            // alert("Server Error Please Try again");
            console.log(error);
        }
    }
    return (
        <div>
            <Toaster />
            <Container sx={{ marginTop: "80px" }}>
                <Grid container gap={3} marginY="50px">
                    <Grid item xs={12} md={7}>
                        <GasDataCard val={ppm} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InfoCard />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <TemperatureCard val={temp} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DateCard />
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <h1>Live Location of Sensor</h1>
                {!isLoaded ? (
                    <>
                        <CircularProgress />
                    </>
                ) : (
                    <GoogleMap
                        mapContainerClassName="map-container"
                        center={center}
                        zoom={14}
                    >
                        <Marker position={coord} />
                    </GoogleMap>
                )}
            </Container>
        </div>
    )
}

export default Dashboard