import axios from 'axios';

const PROXY_URL = 'http://localhost:3000/api';
const CLIENT_ID = 'vbp7UQ6MJVoQQMClqaMJjlOSfCqGAErS';
const CLIENT_SECRET = 'i5AbtdXktpvoETUmDdusTc5b3hknccM66M2fv9aGxeikkk3ZJuBQOOgHA7bT82Fw';
const AUDIENCE = 'https://api2.arduino.cc/iot';
const API_BASE_URL = '/iot/v2/things/a69b9f59-4fec-4123-beef-ba978f9f8a54/properties/';

async function getToken() {
    const url = '/iot/v1/clients/token';
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        audience: AUDIENCE
    }).toString();

    const config = {
        method: 'post',
        url: PROXY_URL + url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data
    };

    try {
        const response = await axios(config);
        // console.log("Token obtenido correctamente: " + response.data['access_token']);
        return response.data['access_token'];
    } catch (error) {
        console.error("Failed getting an access token: " + error);
        return null;
    }
}

async function movement(energize, direction) {
    const token = await getToken();
    if (!token) {
        return;
    }

    let pid = "";

    switch (direction) {
        case "UP":
            pid = "02f5934b-ac88-44bf-a98c-4bcc4264bf66"; // Forward
            break;
        case "LEFT":
            pid = "a5343249-e782-4e94-a196-1d5154ec6342"; // Left
            break;
        case "DOWN":
            pid = "cb03085b-3424-4610-aabe-d6b8565e6a0b"; // Down
            break;
        case "RIGHT":
            pid = "383ff582-a3e2-48b1-90b5-3eabff680a22"; // Right
            break;
        default:
            console.error("Invalid direction");
            return;
    }

    const propertyValue = { value: energize };

    try {
        const response = await axios.put(PROXY_URL + API_BASE_URL + pid + '/publish', propertyValue, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log('API called successfully.', response.data);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
}

async function useController(use) {
    const token = await getToken();
    if (!token) {
        return;
    }

    let pid = "77e53dcf-fb67-4a9f-8d0f-d9e8532e3ad9";
    const propertyValue = { value: use };

    try {
        const response = await axios.put(PROXY_URL + API_BASE_URL + pid + '/publish', propertyValue, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log('API called successfully.', response.data);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
}

export { movement, useController };
