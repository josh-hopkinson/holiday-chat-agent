import moment from 'moment-timezone';

export default {
    methods :{
        capitalize(value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        dateTime(value) {
            return moment(value).tz('Europe/London').format('hh:mm');
        },
    }
};