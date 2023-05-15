import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import data from '../datasets/gasValueData_4.json'
import HighchartsExporting from 'highcharts/modules/exporting';
HighchartsExporting(Highcharts);

function TimeSeriesChart({ loading, dataPoints }) {

    const [options,setOptions] = useState({})

    useEffect(() => {
        const obj = {
            chart: {
                zoomType: 'x',
            },
            title: {
                text: 'Air Quality Value in PPM',
                align: 'left'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
                align: 'left'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Air Quality PPM'
                }
            },
            time: {
                useUTC: false
            },
            legend: {
                enabled: false
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
                name: 'Air Quality',
                data: dataPoints
            }]
        };
        setOptions({...obj})
        
    }, [dataPoints])
    
    //     chart: {
    //         zoomType: 'x',
    //     },
    //     title: {
    //         text: 'Air Quality Value in mg/m3',
    //         align: 'left'
    //     },
    //     subtitle: {
    //         text: document.ontouchstart === undefined ?
    //             'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
    //         align: 'left'
    //     },
    //     xAxis: {
    //         type: 'datetime'
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Air Quality PPM'
    //         }
    //     },
    //     legend: {
    //         enabled: false
    //     },
    //     plotOptions: {
    //         area: {
    //             fillColor: {
    //                 linearGradient: {
    //                     x1: 0,
    //                     y1: 0,
    //                     x2: 0,
    //                     y2: 1
    //                 },
    //                 stops: [
    //                     [0, Highcharts.getOptions().colors[0]],
    //                     [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
    //                 ]
    //             },
    //             marker: {
    //                 radius: 2
    //             },
    //             lineWidth: 1,
    //             states: {
    //                 hover: {
    //                     lineWidth: 1
    //                 }
    //             },
    //             threshold: null
    //         }
    //     },

    //     series: [{
    //         type: 'area',
    //         name: 'Air Quality',
    //         data: dataPoints
    //     }]
    // });
    return (
        <div>
            {loading ? <CircularProgress /> : (
                <>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </>
            )}
        </div>
    )
}

export default TimeSeriesChart