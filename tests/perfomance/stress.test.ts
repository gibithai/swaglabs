import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 5 },  // Starting from 5 Users
        { duration: '20s', target: 20 }, // Increasing the load
        { duration: '10s', target: 0 },  // Reset the Load
    ],
};

export default function () {
    let res = http.get('https://www.saucedemo.com/');
    
    check(res, {
        'статус-код 200': (r) => r.status === 200,
        'размер ответа > 5000 байт': (r) => r.body.length > 5000,  // Checking that responce is empty
    });

    sleep(1); // Wait for a bit before the next request
}
