import axios from 'axios';
import moment from 'moment';

const main = async (x: number) => {
    for (let i = x; i > 0; i--) {
        const timeStart = new Date();

        const res = await axios.get('https://tvgo.orange.pl/gpapi/status', {
            validateStatus: (status) => {
                return status > 99;
            },
        });

        if (res.status !== 200) {
            console.error('HTTP status no. ' + res.status);
        }

        const timeEnd = new Date();
        const timeDiff = (timeEnd.getTime() - timeStart.getTime()) / 1000;
        const connectionData =
            moment(timeStart).format('DD.MM.YYYY HH:mm:ss') +
            '; ' +
            res.status +
            ' ' +
            res.statusText +
            '; ' +
            timeDiff +
            's;\r\n';
        console.log(connectionData);
    }
};

main(10);
