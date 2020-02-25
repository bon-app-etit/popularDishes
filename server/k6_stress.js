import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
    vus: 100,
    duration: "60s"
};

export default function() {
    let id = '1';
    id = Math.floor(Math.random() * 10000000)
    http.get(`http://localhost:3001/restaurants/${id}`);
    sleep(1);
}

// export default function() {
//     let id = '1';
//     let reviewId = Math.floor(Math.random() * 10000000)
//     http.get(`http://localhost:3001/restaurants/${id}/dish/review/${reviewId}`);
//     sleep(1);
// }