
import React from "react";
import ReactEcharts from "echarts-for-react"; 
import { outputs } from "../outputs";

function CarbonOperationalChart() { 
    let data = [];
    let dataExample = [];
    let now = new Date(1997, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;
    outputs.forEach(out => {
        const date = out.timestamp;
        data.push(formatDate(new Date(date), out['carbon-operational']))
    })
    // for (var i = 0; i < 1000; i++) {
    //     console.log('example: ', randomData());
    //     dataExample.push(randomData());
    // }
    function formatDate (date, val) {
        //value = value + Math.random() * 21 - 10;
        console.log('val => ', val);
        return {
            name: date.toString(),
            value: [
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/') + " " + [date.getHours(), date.getMinutes()].join(':'),
                val
            ]
        };
    }
    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        console.log('value 2 ', [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
            ]);
        return {
            name: now.toString(),
            value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
            ]
        };
    }
        

    const option = {
        title: {
            text: 'Carbon-operational'
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

export default CarbonOperationalChart;