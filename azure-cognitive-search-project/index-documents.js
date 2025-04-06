require('dotenv').config();
const { SearchIndexClient, SearchIndex } = require('@azure/search-documents');
const { AzureKeyCredential } = require('@azure/identity');

const serviceName = process.env.AZURE_SEARCH_SERVICE_NAME;
const apiKey = process.env.AZURE_SEARCH_API_KEY;
const indexName = process.env.AZURE_SEARCH_INDEX_NAME;

const client = new SearchIndexClient(`https://${serviceName}.search.windows.net`, new AzureKeyCredential(apiKey));

const documents = [
    { id: "1", title: "Document 1", content: "This is the content of document 1.", createdAt: new Date() },
    { id: "2", title: "Document 2", content: "This is the content of document 2.", createdAt: new Date() }
];

async function indexDocuments() {
    try {
        const result = await client.uploadDocuments(documents);
        console.log(`Documents indexed successfully: ${result.results.length} documents.`);
    } catch (err) {
        console.error("Error indexing documents:", err);
    }
}

indexDocuments();