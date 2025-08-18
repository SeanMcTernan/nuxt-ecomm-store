import type { Handler } from '@netlify/functions';
import { fetchWithCache, getCacheStatus, DAY } from '@netlify/cache';
import fetch from 'node-fetch';
import { CodezeroAgent } from '@c6o/codezero-agent';

export const handler: Handler = async (event, context) => {
    try {
        // Initialize the CodezeroAgent
        const agent = new CodezeroAgent();

        // Make the request using CodezeroAgent
        const response = await fetchWithCache("https://example.com/expensive-api", {
            ttl: 2 * DAY, // Two days
            tags: ["product", "sale"],
            vary: {
                cookie: ["ab_test_name", "ab_test_bucket"],
                query: ["item_id", "page"]
            }
        });

        // Log the response for debugging
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        // Get the response data
        const data = await response.text();
        console.log('Response data:', data);

        // Return the data
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                success: true,
                data: data,
                status: response.status,
                headers: Object.fromEntries(response.headers),
            }),
        };
    } catch (error) {
        console.error('Error in codezero-data function:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            }),
        };
    }
};
