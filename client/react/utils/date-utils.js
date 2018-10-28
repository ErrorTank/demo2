import moment from "moment"
import {mapAbbr} from "../common/timezone";

let formatDate = (date, format) => {
  return moment(date).format(format);
};

let formatWithTz = (date) => {
  return `${formatDate(date)} ${mapAbbr(date.timezone)}`;
};

let  formatTimeWithTz = (date) => {
  let fraction = date.fraction ? `.${date.fraction}` : null;
  let result = formatWithTz(date);
  return fraction ? result.replace(` AM`, `${fraction} AM`).replace(` PM`, `${fraction} PM`) : result;
};

let formatDateTimeWithTz = (date, format = "MMM DD, YYYY h:mm A", abbr = true) => {
  return `${moment(Object.assign({}, date, {month: date.month - 1})).format(format)} ${abbr ? mapAbbr(date.timezone) : ''}`;
};

let getTimestamp = date => {
  return new Date(date).getTime()
};
let parseDate = ({day, month, year}) => {
  return formatDate(new Date(`${month}/${day}/${year}`), "MM/DD/YYYY")
};
let parseStrToDate = (str) => {

};

let addDay = (date, days) => {
  return new Date(date.setDate(new Date(date).getDate() + days));
};
let parseTime = ({day, month, year, hour, minute}) => {
  return formatDate(new Date(`${month}/${day}/${year} ${hour}:${minute}`), "hh:mm a")
};

let convertOffsetToMinutes = (offset) => {
  if (!offset || offset.length != 5) {
    throw new Error("offset must be a string and has format `-0500`");
  }
  const sign = offset.substr(0, 1) == "+" ? 1 : -1;
  const hours = parseInt(offset.substr(1, 2));
  const minutes = parseInt(offset.substr(3, 2));
  return sign * (hours * 60 + minutes);
};

let toDate = (date) => {
  if (typeof date === "string") return new Date(date);
  const {year, month, day = 1, hour = 0, minute = 0, second = 0} = date;
  return new Date(year, month - 1, day, hour, minute, second);
};

let remainingTimeFromNow = (date) => {
  let dateNow = new Date().getTime();

  if (date.offset) {
    const _date = new Date();
    dateNow = _date.getTime() + _date.getTimezoneOffset() * 60 * 1000 - convertOffsetToMinutes(date.offset) * 60 * 1000;
  }

  return toDate(date).getTime() - dateNow;
};

export {
  formatDate,
  getTimestamp,
  formatWithTz,
  parseDate,
  parseTime,
  remainingTimeFromNow,
  toDate,
  addDay,
  formatDateTimeWithTz,
  formatTimeWithTz
}
