import json from '../../output.json';

export const calculateAverages = (metrics) => {
    let val = 0;
    json.forEach(entry =>{
        val += entry[metrics];
    })
    const average = val/json.length;
    return average.toString().substring(0, 7);
}