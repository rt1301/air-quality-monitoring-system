import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts';
import { CircularProgress } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import data from '../datasets/temperatureData.json'
import HighchartsExporting from 'highcharts/modules/exporting';
HighchartsExporting(Highcharts);

function TemperatureChart({ loading, dataPoints }) {
    const [options, setOptions] = useState({});
    useEffect(() => {
        const obj = {

            chart: {
                zoomType: 'x'
            },

            title: {
                text: 'Temperature Readings in ℃',
                align: 'left'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
                align: 'left'
            },
            accessibility: {
                screenReaderSection: {
                    beforeChartFormat: '<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>'
                }
            },

            tooltip: {
                valueDecimals: 2
            },

            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: "Temperature in ℃"
                }
            },

            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                data: dataPoints,
                name: 'Temperature'
            }]

        }
        setOptions({...obj})
    }, [dataPoints])

    return (
        <div>
            { loading ? <CircularProgress /> : (
                <HighchartsReact highcharts={Highcharts} options={options} />
            ) }
        </div>
    )
}

export default TemperatureChart