import moment from "moment/moment";

const timeStrToMoment = (timeStr) =>{
    return moment(timeStr, "HH")
}

export default timeStrToMoment;