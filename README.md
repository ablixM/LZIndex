# LayerZero AI Search

A search application for LayerZero content using Elasticsearch.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following contents:

   ```
   # Server Configuration
   PORT=5000

   # ElasticSearch Configuration
   ES_URL=http://localhost:9200
   ES_USERNAME=elastic
   ES_PASSWORD=changeme

   # Frontend URL for CORS (if needed)
   FRONTEND_URL=http://localhost:5173
   ```

   Adjust the values according to your Elasticsearch setup.

## Running the Application

You can run both the server and frontend concurrently:

```
npm run start
```

Or run them separately:

```
# Run the frontend only
npm run dev

# Run the server only
npm run server
```

The frontend will be available at http://localhost:5173 and the server at http://localhost:5000.

## API Endpoints

- `GET /api/search?q=<query>` - Search for content matching the query

## Technologies Used

- Frontend: React, TypeScript, TailwindCSS
- Backend: Express.js, Elasticsearch
- Development: Vite, Nodemon, Concurrently
