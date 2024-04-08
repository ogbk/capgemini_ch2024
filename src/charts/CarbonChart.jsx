
import React from "react";
import ReactEcharts from "echarts-for-react"; 
import outputs from '../../output.json';
import { convertTimestamp } from "../services/formatTimestamp";

function CarbonChart( { title, metrics } ) { 
    let data = [];

    outputs.forEach(out => {
        const date = out.timestamp;
        const normalisedTimestamp = convertTimestamp(date);
        data.push(defineData(new Date(normalisedTimestamp), out[metrics]))
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
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
            show: false
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