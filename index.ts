import axios from 'axios';

const main = async (x: number) => {
    for (let i = x; i > 0; i--) {
        const res = await axios.get('https://tvgo.orange.pl/gpapi/status');
        console.log(res.data);
    }
};

main(10);
