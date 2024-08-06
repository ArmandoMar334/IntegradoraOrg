import axios from 'axios';

const CLIENT_ID = 'vbp7UQ6MJVoQQMClqaMJjlOSfCqGAErS';
const CLIENT_SECRET = 'i5AbtdXktpvoETUmDdusTc5b3hknccM66M2fv9aGxeikkk3ZJuBQOOgHA7bT82Fw';
const API_BASE_URL = 'http://159.223.182.187:3000/api';

async function getToken() {
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        audience: 'https://api2.arduino.cc/iot'
    });

    try {
        const response = await axios.post(
            `${API_BASE_URL}/iot/v1/clients/token`,
            data,
        );

        console.log("Token obtenido correctamente: " + ['access_token']);
        return axios.create({
            baseURL: API_BASE_URL, // Replace with your base URL
            headers: {
                'Authorization': `Bearer ${response.data.access_token}`,
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error("Failed getting an access token: " + error);
        return null;
    }
}

async function getProperty(pid, authAxios) {
    const response = await authAxios.get(`${API_BASE_URL}/iot/v2/things/a69b9f59-4fec-4123-beef-ba978f9f8a54/properties/${pid}`);
    return response.data.last_value;
}

async function getGPSData() {
    try {
        const authAxios = await getToken();

        const pidLatitude = "f4dd54d2-586a-4c0b-938a-d79491d8d80a"; // The id of the thing Latitude
        const pidLongitude = "7b8f03a7-4eb4-4acd-b58e-2f0373d17069"; // The id of the thing Longitude


        const [latitude, longitude] = await Promise.all([
            getProperty(pidLatitude, authAxios),
            getProperty(pidLongitude, authAxios),
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