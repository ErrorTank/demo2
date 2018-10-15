
export function formatMoney(num) {
    if(typeof num === 'string' ){
        if( /[k|m|b|t]/g.test(num)) return "$" + num;
    }
    return ("$" + num);
}

