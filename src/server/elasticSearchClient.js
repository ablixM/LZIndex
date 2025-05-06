// server/elasticSearchClient.js
const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

// Initialize Elasticsearch client with authentication
const client = new Client({
  node: process.env.ES_URL, // Elasticsearch cluster URL from .env
  auth: {
    username: process.env.ES_USERNAME, // Add this to your .env file
    password: process.env.ES_PASSWORD  // Add this to your .env file
  }
});

module.exports = client;
