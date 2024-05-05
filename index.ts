import axios from 'axios';

const main = async (x: number) => {
    for (let i = x; i > 0; i--) {
        const timeStart = new Date();

        const res = await axios.get('https://tvgo.orange.pl/gpapi/status');

        const timeEnd = new Date();
        const timeDiff = (timeEnd.getTime() - timeStart.getTime()) / 1000;
        console.log(timeDiff);
    }
};

main(10);
