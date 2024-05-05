import axios from 'axios';
import moment from 'moment';
import { resSchema } from './schema';
import { delay } from './delay';
import * as fs from 'fs';
import { mean } from './mean';

export const main = async ({ x, y }: { x: number; y: number }) => {
    let packetsLost = 0;
    let packetsSent = 0;
    let packetsReceived = 0;
    let packetsWanderingTime: number[] = [];
    const logStream = fs.createWriteStream('log.txt', { flags: 'w' });

    for (let i = x; i > 0; i--) {
        let schemaValidation = '';
        const timeStart = new Date();
        try {
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
                .then(() => (schemaValidation = 'JSON zgodny ze schematem'))
                .catch((error) => {
                    schemaValidation = error.name + ': ' + error.errors;
                    console.error(schemaValidation);
                });

            packetsReceived++;
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
                's; ' +
                schemaValidation +
                ';\r\n';
            console.log(connectionData);
            packetsWanderingTime.push(timeDiff);
            logStream.write(connectionData);
        } catch (error: any) {
            packetsLost++;
            if (error.cause) {
                const connetionData =
                    moment(timeStart).format('DD.MM.YYYY HH:mm:ss') +
                    '; Pakiet stracony; ' +
                    error.cause +
                    ';\r\n';
                logStream.write(connetionData);
                console.log(connetionData);
            }
        } finally {
            packetsSent++;
        }
        await delay(y);
    }
    const extraData =
        'Pakiety wysłane: ' +
        packetsSent +
        '; Pakiety odebrane: ' +
        packetsReceived +
        '; Pakietsy stracone: ' +
        packetsLost +
        (packetsWanderingTime.length > 0 ? Math.max(...packetsWanderingTime) : 'N/A') +
        '; Minimalny czas błądzenia pakietów: ' +
        (packetsWanderingTime.length > 0 ? Math.min(...packetsWanderingTime) : 'N/A') +
        '; Średni czas błądzenia pakietów: ' +
        (packetsWanderingTime.length > 0
            ? Math.round(mean(packetsWanderingTime) * 1000) / 1000
            : 'N/A') +
        ';';

    logStream.write(extraData);
    console.log(extraData);
    logStream.end();
};
