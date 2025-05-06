// server/routes/search.js
const express = require('express');
const router = express.Router();
const client = require('../elasticSearchClient');

// Search endpoint
router.get('/', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const queryBody = {
            index: 'transcripts',
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                multi_match: {
                                    query: query,
                                    fields: ['title', 'transcript', 'keywords'], // Search in these fields
                                },
                            },
                            {
                                nested: {
                                    path: 'timestamps', // Specify the nested path
                                    query: {
                                        match: {
                                            'timestamps.text': query, // Search in timestamps.text
                                        },
                                    },
                                    inner_hits: {}, // Include matching nested documents in the response
                                },
                            },
                        ],
                    },
                },
                highlight: {
                    fields: {
                        transcript: {}, // Highlight matches in transcript
                        'timestamps.text': {}, // Highlight matches in timestamps.text
                    },
                },
            },
        };

        console.log('Elasticsearch query:', JSON.stringify(queryBody, null, 2)); // Log the query being sent

        const response = await client.search(queryBody);

        console.log('Elasticsearch response:', JSON.stringify(response, null, 2)); // Log the full response for debugging

        const hits = response.hits?.hits || []; // Safely access hits

        if (hits.length === 0) {
            return res.status(200).json({ message: 'No results found', results: [] });
        }

        // Map the Elasticsearch hits to the desired format
        const results = hits.map(hit => {
            const matchingTimestamps = hit.inner_hits?.timestamps?.hits?.hits.map(nestedHit => ({
                text: nestedHit._source.text, // Extract the matching text
                start: nestedHit._source.start, // Extract the start timestamp
                duration: nestedHit._source.duration, // Extract the duration
            })) || [];

            return {
                title: hit._source.title,
                youtubeLink: hit._source.youtubeLink,
                downloadLink: hit._source.downloadLink,
                matchingTimestamps, // Include only the matching timestamps
                highlight: hit.highlight ? hit.highlight.transcript : [], // Include highlighted text
            };
        });

        res.json(results);
    } catch (error) {
        console.error('Error searching Elasticsearch:', error); // Log the full error object for debugging

        const errorMessage = error.meta?.body?.error || error.message || 'Unknown error occurred';
        res.status(500).json({ error: 'Failed to search', details: errorMessage });
    }
});

module.exports = router;
