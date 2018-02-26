import * as moment from "moment/moment";

export const dateTimeOf = (epoch) => {
    return moment.unix(epoch).utcOffset(0).format('hh:mm:ss YYYY/MM/DD')
};