require('dotenv').config();
const { SearchIndexClient, SearchIndex } = require('@azure/search-documents');
const { AzureKeyCredential } = require('@azure/identity');

const serviceName = process.env.AZURE_SEARCH_SERVICE_NAME;
const apiKey = process.env.AZURE_SEARCH_API_KEY;
const indexName = process.env.AZURE_SEARCH_INDEX_NAME;

const client = new SearchIndexClient(`https://${serviceName}.search.windows.net`, new AzureKeyCredential(apiKey));

const index = {
    name: indexName,
    fields: [
        { name: "id", type: "Edm.String", key: true, searchable: true },
        { name: "title", type: "Edm.String", searchable: true },
        { name: "content", type: "Edm.String", searchable: true },
        { name: "createdAt", type: "Edm.DateTimeOffset", searchable: false }
    ]
};

async function createIndex() {
    await client.createIndex(index);
    console.log(`Index ${indexName} created.`);
}

createIndex().catch(err => {
    console.error("Error creating index:", err);
});