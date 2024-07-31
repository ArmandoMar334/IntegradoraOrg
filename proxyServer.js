const express = require('express');
const request = require('request');
const app = express();

app.use('/api', (req, res) => {
  const url = `https://api2.arduino.cc${req.url}`;
  req.pipe(request({ url, headers: { Authorization: req.headers.authorization } })).pipe(res);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
