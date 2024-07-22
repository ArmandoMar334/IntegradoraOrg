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


async function movement(energize, direction) {
    // Configurar token de acceso OAuth2 para autorización
    const token = await getToken();
    if (!token) {
        return;
    }

    const API_URL = `https://api2.arduino.cc/iot/v2/things/a69b9f59-4fec-4123-beef-ba978f9f8a54/properties/`;


    let pid = "";

    switch (direction) {
        case "UP":
            pid = "02f5934b-ac88-44bf-a98c-4bcc4264bf66"; // El id de la propiedad Forward
            break;
        case "LEFT":
            pid = "a5343249-e782-4e94-a196-1d5154ec6342"; // El id de la propiedad Left
            break;
        case "DOWN":
            pid = "cb03085b-3424-4610-aabe-d6b8565e6a0b"; // El id de la propiedad Down
            break;
        case "RIGHT":
            pid = "383ff582-a3e2-48b1-90b5-3eabff680a22"; // El id de la propiedad Right
            break;
    }

    const propertyValue = { value: energize }; // Valor de la propiedad

    try {
        const response = await axios.post(CORS_PROXY + API_URL + pid + '/publish' ,propertyValue, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        /*
        const response = await axios({
            method: 'put',
            url: CORS_PROXY + API_URL + pid,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: propertyValue
        });
        */
        console.log('API called successfully.', response.data);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
}


module.exports = { movement };