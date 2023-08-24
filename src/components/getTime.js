export function getCurrentTime(separator=':'){

    let newDate = new Date()
    let hour = newDate.getTime();
    let minute = newDate.getMinutes() + 1;
    
    return `${hour<10?`0${minute}`:`${minute}`}${separator}${minute<10?`0${minute}`:`${minute}`}${separator}${year}`
}