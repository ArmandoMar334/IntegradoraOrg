var ArduinoIotClient = require('@arduino/arduino-iot-client');
var defaultClient = ArduinoIotClient.ApiClient.instance;
const axios = require("axios").default

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://api2.arduino.cc/iot/v2/things/a69b9f59-4fec-4123-beef-ba978f9f8a54/properties/4a032658-0771-4aa5-8483-3ed39defc59d';

async function getToken() {
    const url = 'https://api2.arduino.cc/iot/v1/clients/token';
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'vbp7UQ6MJVoQQMClqaMJjlOSfCqGAErS',
        client_secret: 'i5AbtdXktpvoETUmDdusTc5b3hknccM66M2fv9aGxeikkk3ZJuBQOOgHA7bT82Fw',
        audience: 'https://api2.arduino.cc/iot'
    }).toString();

    const config = {
        method: 'post',
        url: CORS_PROXY + url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data
    };

    try {
        const response = await axios(config);
        console.log("Token obtenido correctamente: " + response.data['access_token']);
        return response.data['access_token'];
    } catch (error) {
        console.error("Failed getting an access token: " + error);
        return null;
    }
}

async function getProperty(pid, token) {
    const API_URL = `https://api2.arduino.cc/iot/v2/things/a69b9f59-4fec-4123-beef-ba978f9f8a54/properties/${pid}`;
    const response = await axios.get(CORS_PROXY + API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.last_value;
}

async function getGPSData() {
    try {
        const token = await getToken();
        if (!token) {
            return;
        }

        const pidLatitude = "f4dd54d2-586a-4c0b-938a-d79491d8d80a"; // The id of the thing Latitude
        const pidLongitude = "7b8f03a7-4eb4-4acd-b58e-2f0373d17069"; // The id of the thing Longitude

        const [latitude, longitude] = await Promise.all([
            getProperty(pidLatitude, token),
            getProperty(pidLongitude, token),
        ]);

        return [latitude, longitude];
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
}

module.exports = { getGPSData };