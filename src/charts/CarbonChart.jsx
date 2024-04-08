
import React from "react";
import ReactEcharts from "echarts-for-react"; 
import outputs from '../../output.json';
import { convertTimestamp } from "../services/formatTimestamp";

function CarbonChart( { title, metrics, yAxeName } ) { 
    let data = [];

    outputs.forEach(out => {
        const date = out.timestamp;
        const normalisedTimestamp = convertTimestamp(date);
        let val = out[metrics];
        if (metrics === 'network/energy') {
            // get rid of e-7 in values like 4.0800000000000005e-7 
            const index = val.toString().indexOf('e-7');
            val = out[metrics].toString().substring(0, index);
        }
        data.push(defineData(new Date(normalisedTimestamp), val));
    })

    function defineData (date, val) {
        return {
            name: date.toString(),
            value: [
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/') + " " + [date.getHours(), date.getMinutes()].join(':'),
                val
            ]
        };
    }
    const option = {
        title: {
            text: title
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
                date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear() +
                ' : ' +
                params.value[1]
            );
            },
            axisPointer: {
            animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
            show: false
            }
        },
        yAxis: {
            name: yAxeName,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }, 
           axisLabel: {
                formatter: (val) => {
                    return val.toString().substring(0, 6);
                }
            }
        },
        series: [
            {
                name: 'Data',
                type: 'line',
                showSymbol: false,
                data: data
            }
        ]
    };

    setInterval(function () {
        outputs.forEach(out => {
            const date = out.timestamp;
            const normalisedTimestamp = convertTimestamp(date);
            data.push(defineData(new Date(normalisedTimestamp), out[metrics]))
        })
        option.data = data;
        // every 10 seconds check file content
    }, 10000);
    
    return <ReactEcharts option={option} />;
} 

export default CarbonChart;