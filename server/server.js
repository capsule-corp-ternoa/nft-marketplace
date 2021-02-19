const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mock = require('./mock');

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, '../build'), { index: false }));

app.get('/ping', (req, res) => res.send('pong'));

// Get nfts info
app.get('/nft-api/nfts', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(mock.nfts));
});

// Get nfts info
app.get('/nft-api/nft/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(mock.nft));
});

// Get nfts info
app.get('/nft-api/user/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(mock.user));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8181);

