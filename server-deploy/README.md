# LayerZero AI Server

Backend server for the LayerZero AI search application.

## Deployment Info

The server is deployed at: https://lzindex-server.onrender.com

## Environment Variables

The following environment variables are required:

```
PORT=10000
FRONTEND_URL=https://lz-ai.vercel.app
ES_URL=your-elasticsearch-url
ES_USERNAME=elastic
ES_PASSWORD=your-password
```

## Deployment to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add the environment variables
5. Deploy
