interface Result {
  FirstURL: string;
  Text: string;
  Description: string;
}

interface DuckDuckGoResponse {
  Results: Result[];
}

async function getSearchResults(query: string): Promise<void> {
  const API_URL = `https://api.duckduckgo.com/?q=${query}&format=json`;
  const response = await fetch(API_URL);
  const data: DuckDuckGoResponse = await response.json();
  console.log("Search Results: ", data.Results);
  data.Results.forEach(result => {
    console.log("Result URL: ", result.FirstURL);
    console.log("Result Title: ", result.Text);
    console.log("Result Description: ", result.Description);
  });
}

// Example usage:
getSearchResults("javascript fetch api");


