const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const mock = require('./mock');

dotenv.config();

const app = express();

const nftApiUrl = `${process.env.NFT_API_HOST}:${process.env.NFT_API_PORT}`;

app.use(express.static(path.join(__dirname, '../build'), { index: false }));

app.get('/ping', (req, res) => res.send('pong'));

// Get nfts info
app.get('/nft-api/nfts', (req, res) => {

  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(mock.nfts));

  // console.log(' >>>>>>> Entered in the backend side');
  // const options = {
  //   url: `${nftApiUrl}/nfts`,
  //   method: 'get',
  // };

  // return axios(options)
  //   .then((response) => res.send(response.data));
  
});

// Get nfts info
app.get('/nft-api/nft/:id', (req, res) => {
  // console.log(' >>>>>>> Entered in the backend side');
  // const options = {
  //   url: `${nftApiUrl}/nft/1`,
  //   method: 'get',
  // };

  // return axios(options)
  //   .then((response) => res.send(response.data));

  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(mock.nft));
  
});

// Get nfts info
app.get('/nft-api/user/:id', (req, res) => {
  // console.log(' >>>>>>> Entered in the backend side');
  // const options = {
  //   url: `${nftApiUrl}/user/1`,
  //   method: 'get',
  // };

  // return axios(options)
  //   .then((response) => res.send(response.data));

  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(mock.user));
  
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 80);

