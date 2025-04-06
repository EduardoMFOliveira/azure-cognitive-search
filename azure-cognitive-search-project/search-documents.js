require('dotenv').config();
const { SearchClient } = require('@azure/search-documents');
const { AzureKeyCredential } = require('@azure/identity');

const serviceName = process.env.AZURE_SEARCH_SERVICE_NAME;
const apiKey = process.env.AZURE_SEARCH_API_KEY;
const indexName = process.env.AZURE_SEARCH_INDEX_NAME;

const client = new SearchClient(`https://${serviceName}.search.windows.net`, indexName, new AzureKeyCredential(apiKey));

async function searchDocuments(searchText) {
    try {
        const results = await client.search(searchText);
        console.log("Search results:");
        for await (const result of results.results) {
            console.log(`- ${result.document.title}: ${result.document.content}`);
        }
    } catch (err) {
        console.error("Error searching documents:", err);
    }
}

// Exemplo de busca
searchDocuments("Document 1");