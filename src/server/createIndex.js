const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const client = new Client({
    node: process.env.ES_URL,
    auth: {
        username: process.env.ES_USERNAME,
        password: process.env.ES_PASSWORD,
    },
});

async function createIndex() {
    try {
        const response = await client.indices.create({
            index: 'transcripts',
            body: {
                mappings: {
                    properties: {
                        title: { type: 'text' },
                        transcript: { type: 'text' },
                        keywords: { type: 'keyword' },
                        timestamps: {
                            type: 'nested',
                            properties: {
                                text: { type: 'text' },
                                start: { type: 'float' },
                                duration: { type: 'float' },
                            },
                        },
                        youtubeLink: { type: 'text' },
                        downloadLink: { type: 'text' },
                    },
                },
            },
        });
        console.log('Index "transcripts" created:', response);
    } catch (error) {
        console.error('Error creating index:', error);
    }
}

createIndex();