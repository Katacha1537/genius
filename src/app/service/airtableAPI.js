import axios from 'axios';

export const airtableAPI = axios.create({
    baseURL: `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC__AIRTABLE_BASE}`,
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC__AIRTABLE_AUTH_TOKEN}`
    }
});
