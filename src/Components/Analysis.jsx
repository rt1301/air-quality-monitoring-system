import React, { useState, useEffect } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import { Container, Box, Button, CircularProgress } from '@mui/material';
import { LocalizationProvider, DesktopDateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TimeSeriesChart from './TimeSeriesChart'
import TemperatureChart from './TemperatureChart'
import DateTimeExample from './DateTimeExample';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
const { allowedMaxDays, allowedDays, allowedRange, beforeToday, afterToday, combine } =
  DateRangePicker;

function Analysis() {
  const [gasLoading, setGasLoading] = useState(false);
  const [tempLoading, setTempLoading] = useState(false);
  const [dataPoints, setDataPoints] = useState([]);
  const [temperatureData, setTemperature] = useState([]);
  const [stDate, setStDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateValue, setDateValue] = useState([new Date(), new Date()]);
  const [minDate, setMinDate] = useState(null);
  const [dateRangeFlag, setDateRangeFlag] = useState(false);
  useEffect(() => {
    fetchAllDataPoints();
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      if (!dateRangeFlag) {
        fetchCurrentData();
      } else {
        return;
      }
    }, 5000);

    return () => {
      clearInterval(id);
    }
  }, [dateRangeFlag])


  const fetchCurrentData = async () => {
    try {
      const res = await axios.get("https://api-airquality-nitt.onrender.com/api/getLatestVal")
      const doc = res.data;
      if (doc.code === 200) {
        const { airData, timestamp } = doc.data[0];
        const { gas, temperature } = airData;
        let gasValue = ((gas * 1023) / 100).toFixed(3)
        setTemperature(prev => [...prev, [new Date(timestamp).getTime(), temperature]]);
        setDataPoints(prev => [...prev, [new Date(timestamp).getTime(), Number(gasValue)]]);
      }
    } catch (error) {
      // alert("Server Error Please Try again");
      console.log(error);
    }
  }

  const fetchDataRange = async (start, end) => {
    setDateRangeFlag(true);
    setGasLoading(true);
    setTempLoading(true);

    try {
      const res = await axios.post("https://api-airquality-nitt.onrender.com/api/getDataRange", {
        start,
        end
      });
      const doc = res.data;
      let data = [];
      let tempDate = [];
      if (doc.code === 400) {
        return alert(doc?.error);
      }
      doc.data.map((ele) => {
        const { airData, timestamp } = ele;
        const { gas, temperature } = airData;
        let gasValue = (gas * 1023) / 100
        data.push([
          new Date(timestamp).getTime(),
          Number(gasValue.toFixed(3))
        ])
        tempDate.push([
          new Date(timestamp).getTime(),
          Number(temperature.toFixed(3))
        ])

      })
      setDataPoints([...data]);
      setGasLoading(false);
      setTemperature([...tempDate]);
      setTempLoading(false);

    } catch (error) {
      console.log(error);
      alert("Server Error Please Try again");
      setGasLoading(false);
      setTempLoading(false);

    }
  }

  const fetchAllDataPoints = async () => {
    setDateRangeFlag(false);
    setGasLoading(true);
    setTempLoading(true);
    try {
      const res = await axios.get("https://api-airquality-nitt.onrender.com/api/listAll");
      const doc = res.data;
      let data = [];
      let tempData = [];
      if (doc.code === 400) {
        return alert(doc?.error);
      }
      doc.data.map((ele) => {
        const { airData, timestamp } = ele;
        const { gas, temperature } = airData;
        let gasValue = (gas * 1023) / 100
        data.push([
          new Date(timestamp).getTime(),
          Number(gasValue.toFixed(3))
        ])
        tempData.push([
          new Date(timestamp).getTime(),
          temperature
        ])
      })
      if (data.length > 0 && minDate === null) {
        setMinDate(dayjs(data[0][0]));
      }
      setDataPoints([...data]);
      setTemperature([...tempData]);
      setGasLoading(false);
      setTempLoading(false);
    } catch (error) {
      console.log(error);
      alert("Server Error Please Try again");
      setGasLoading(false);
      setTempLoading(false);
    }
  }

  const handleGasChartSubmit = () => {
    setDateRangeFlag(true);
    let s = dateValue[0]
    let e = dateValue[1]

    if (dayjs(s).isAfter(e)) {
      alert("Please choose a valid Date Range");
    }
    fetchDataRange(dateValue[0].toISOString(), dateValue[1].toISOString());
  }

  const handleLiveDate = () => {
    setDateRangeFlag(false);
    setDataPoints([]);
    setTemperature([]);
    fetchCurrentData();
  }

  const resetDateRange = () => {
    setDateValue([new Date(), new Date()])
    fetchAllDataPoints();
  }
  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <h1 style={{ textAlign: "center", paddingTop: "5px", paddingBottom: "5px" }}>Data Monitoring</h1>
        {(gasLoading || !minDate) ? (
          <><CircularProgress color="success" /></>
        ) : (
          <Container maxWidth="xl">
            <Box display="flex" alignItems="center" margin="auto" marginY="20px">
              <DateRangePicker
                format="yyyy-MM-dd HH:mm:ss"
                shouldDisableDate={allowedRange(new Date(minDate), new Date())}
                showMeridian
                onChange={setDateValue}
              />
              <Button onClick={handleGasChartSubmit}>Submit</Button>

              <Button onClick={resetDateRange} sx={{ marginX: "15px" }}>Show Historical Data</Button>
              <Button onClick={handleLiveDate} sx={{ marginX: "15px" }}>Show Live Data</Button>
            </Box>
            <TimeSeriesChart loading={gasLoading} dataPoints={dataPoints} />
            <br />
            <TemperatureChart loading={tempLoading} dataPoints={temperatureData} />
          </Container>
        )}
      </div>
    </>
  )
}

export default Analysis