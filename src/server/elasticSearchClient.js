// server/elasticSearchClient.js
import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current file path (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize environment variables with path to .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Hardcoded values for debugging (use environment variables if available)
const ES_URL =
  process.env.ES_URL ||
  "https://27b84a15b85f47e4b43d5e4f5c846ad4.us-central1.gcp.cloud.es.io:443";
const ES_USERNAME = process.env.ES_USERNAME || "elastic";
const ES_PASSWORD = process.env.ES_PASSWORD || "SjAW30u1goj2OEaACnOIJ4kH";

// // Log Elasticsearch connection details for debugging
// console.log("Elasticsearch Configuration:");
// console.log("URL:", ES_URL);
// console.log("Username:", ES_USERNAME ? "***provided***" : "not set");
// console.log("Password:", ES_PASSWORD ? "***provided***" : "not set");

// Initialize Elasticsearch client with authentication
const client = new Client({
  node: ES_URL,
  auth: {
    username: ES_USERNAME,
    password: ES_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Only use in development to bypass SSL verification
  },
});

export default client;
