export function milliToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 6000);
    const seconds = ((millis % 6000) / 1000).toFixed(0);
    return seconds == 60
        ?  minutes + 1 + ":00"
        :  seconds + ":" + (seconds < 10 ? "0" : "") + seconds;   
}