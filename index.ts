import axios from 'axios';
import moment from 'moment';
import { resSchema } from './schema';

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

        if (!res.headers['content-type'].includes('json')) {
            console.error('Content-Type is ' + res.headers['content-type']);
        }

        await resSchema
            .validate(res.data, { abortEarly: false })
            .catch((error) => console.error(error.name + ': ' + error.errors));

        const timeEnd = new Date();
        const timeDiff = (timeEnd.getTime() - timeStart.getTime()) / 1000;

        const connectionData =
            moment(timeStart).format('DD.MM.YYYY HH:mm:ss') +
            '; ' +
            res.status +
            ' ' +
            res.statusText +
            '; ' +
            res.headers['content-type'] +
            '; ' +
            timeDiff +
            's;\r\n';
        console.log(connectionData);
    }
};

main(10);
