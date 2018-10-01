import moment from "moment"
import {mapAbbr} from "../common/timezone";

let formatDate = (date, format) => {
    return moment(date).format(format);
};

let formatWithTz = (date) => {
    return `${formatDate(date)} ${mapAbbr(date.timezone)}`;
};

let getTimestamp = date => {
  return new Date(date).getTime()
};
let parseDate = ({day, month, year}) => {
  return formatDate(new Date(`${month}/${day}/${year}`),"MM/DD/YYYY")
};

let parseTime = ({day, month, year, hour, minute}) => {
  return formatDate(new Date(`${month}/${day}/${year} ${hour}:${minute}`), "hh:mm a")
};

export  {
    formatDate,
    getTimestamp,
    formatWithTz,
    parseDate,
    parseTime
}
