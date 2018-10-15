import {remainingTimeFromNow} from "./date-utils";

let isPastOuting = (outing) => {
    return remainingTimeFromNow(outing) < 0
};

let mayNotMeetGoal = (outing) => {
    let timeDiff = new Date(outing.deadline.year, outing.deadline.month - 1, outing.deadline.day) - new Date();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays <= 14 && diffDays >= 0 && (outing.tickets_sold / outing.ticket_count) < 0.75;
};


export  {
    isPastOuting,
    mayNotMeetGoal
};
