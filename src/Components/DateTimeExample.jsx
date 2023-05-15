import React, { useState } from 'react'
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
const { allowedMaxDays, allowedDays, allowedRange, beforeToday, afterToday, combine } =
    DateRangePicker;
function DateTimeExample() {
    const [value, setValue] = React.useState([
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
        new Date()]);
    return (
        <div>
            <h3>Date Time Example</h3>
            <p>{(value && value.length>0) && value[0].toLocaleString()}</p>
            <p>{(value && value.length>0) && value[1].toLocaleString()}</p>
            <DateRangePicker
                format="yyyy-MM-dd HH:mm:ss"
                shouldDisableDate={allowedRange(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date())}
                showMeridian
                onChange={setValue}
            />
        </div>
    )
}

export default DateTimeExample