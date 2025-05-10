import dotenv from "dotenv";

// Initialize environment variables
dotenv.config();

const client = new Client({
  node: process.env.ES_URL,
  auth: {
    username: process.env.ES_USERNAME,
    password: process.env.ES_PASSWORD,
  },
});

// Index configuration
const INDEX_NAME = "transcripts";

async function createIndex() {
  try {
    // Check if index exists
    const indexExists = await client.indices.exists({
      index: INDEX_NAME,
    });

    if (indexExists) {
      console.log(`Index '${INDEX_NAME}' already exists. Skipping creation.`);
      return;
    }

    // Create index with mapping for nested timestamps
    await client.indices.create({
      index: INDEX_NAME,
      body: {
        mappings: {
          properties: {
            title: { type: "text" },
            youtubeLink: { type: "keyword" },
            downloadLink: { type: "keyword" },
            transcript: { type: "text" },
            keywords: { type: "text" },
            timestamps: {
              type: "nested",
              properties: {
                text: { type: "text" },
                start: { type: "float" },
                duration: { type: "float" },
              },
            },
          },
        },
        settings: {
          number_of_shards: 1,
          number_of_replicas: 0,
        },
      },
    });

    console.log(`Index '${INDEX_NAME}' created successfully!`);
  } catch (error) {
    console.error("Error creating index:", error);
    process.exit(1);
  }
}

createIndex();
