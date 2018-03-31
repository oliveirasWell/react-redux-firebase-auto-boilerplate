import * as moment from "moment/moment";

export const dateTimeOf = (epoch) => {

    if (epoch == null){
        return null;
    }

    return moment.unix(epoch).utcOffset(0).format('hh:mm:ss YYYY/MM/DD')
};

export const epochFromDate = (date) => {
    return moment(date).unix();
};