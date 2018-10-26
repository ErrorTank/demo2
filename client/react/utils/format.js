
export function formatMoney(num) {
    if(typeof num === 'string' ){
        if( /[k|m|b|t]/g.test(num)) return "$" + num;
    }
    return ("$" + num);
}

export function formatGmDateTime(date = new Date()) {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }
}
