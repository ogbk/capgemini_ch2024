export const calculateAverages = (output, key, maxDecimals = 5) => {
    const totalItems = output.length;
    
    let sum = 0;
    output.forEach((value) => {sum += value[key]});
  
    const average = sum / totalItems;
    return Number(average).toFixed(maxDecimals);
  }