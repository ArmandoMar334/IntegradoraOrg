import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getGPSData } from '../../scripts/GPSData';

const mapStyles = {
  width: "100%",
  height: "500px"
};

const defaultCenter = {
  lat: 40.748817,
  lng: -73.985428
};

export default function GPSScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchGPSData = async () => {
      try {
        const gpsData = await getGPSData();
        if (gpsData) {
          setLatitude(parseFloat(gpsData[0]));
          setLongitude(parseFloat(gpsData[1]));
        }
      } catch (error) {
        setErrorMsg('Error fetching GPS data');
        console.error(error);
      }
    };

    fetchGPSData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ubicación Actual</h1>
      {latitude && longitude ? (
        <LoadScript googleMapsApiKey="AIzaSyBnbf3B7ng1R20paOwrGpyzI7yLeKA8Dso">
          <GoogleMap
            mapContainerStyle={mapStyles}
            center={{ lat: latitude, lng: longitude }}
            zoom={13}
          >
            <Marker position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        </LoadScript>
      ) : errorMsg ? (
        <p>Error: {errorMsg}</p>
      ) : (
        <p>Obteniendo ubicación...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center' as 'center',
    padding: '16px',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    marginBottom: '16px',
  },
};
