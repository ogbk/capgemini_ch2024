
import React from "react";
import ReactEcharts from "echarts-for-react"; 
import { outputs } from "../outputs";

function CPUEnergyChart() { 
    let data = [];

    outputs.forEach(out => {
        const date = out.timestamp;
        data.push(formatDate(new Date(date), out['carbon-operational']))
    })

    function formatDate (date, val) {
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
            text: 'CPU Energy'
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
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: data
            }
        ]
        };
    // setInterval(function () {
    //     for (var i = 0; i < 5; i++) {
    //         data.shift();
    //         data.push(randomData());
    //     }
    //     option.setOption({
    //         series: [
    //             {
    //                 data: data
    //             }
    //             ]
    //         });
    //     }, 1000
    // );
    
    return <ReactEcharts option={option} />;
} 

export default CPUEnergyChart;