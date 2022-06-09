// Global Constants
const API_KEY = ''
const pageLimit = 9;

// Global Variables
var currentApiPage = 0;
var currentSearchTerm = '';

// Query Elements 
const searchFormEl = document.getElementById('search-form');
const searchInputEl = document.getElementById('search-input');
const gifAreaDivEl = document.getElementById('gif-area');
const showMeMoreBtnEl = document.getElementById('show-me-more-btn');

// Functions
async function getResults(searchTerm) {
    const offset = currentApiPage * pageLimit;
    const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=${pageLimit}&offset=${offset}&api_key=${API_KEY}`);
    const jsonResponse = await response.json();
    return jsonResponse.data;
}

// Displays results on the HTML page
function displayResults(results) {
    const gifsHTMLString = results.map(gif => `
        <div class="gif">
            <img src="${gif.images.original.url}" />
        </div>
    `).join('');

    gifAreaDivEl.innerHTML = gifAreaDivEl.innerHTML + gifsHTMLString;
}

// Functions
async function handleFormSubmit(event) {
    event.preventDefault();
    gifAreaDivEl.innerHTML = '';
    currentSearchTerm = searchInputEl.value;
    const results = await getResults(currentSearchTerm);
    displayResults(results);
    searchInputEl.value = '';
    currentApiPage++;
    showMeMoreBtnEl.classList.remove('hidden');
}
// Event Listeners
searchFormEl.addEventListener('submit', handleFormSubmit);

async function handleShowMeMoreClick(event) {
    const results = await getResults(currentSearchTerm);
    displayResults(results);
    currentApiPage++;
}

showMeMoreBtnEl.addEventListener('click', handleShowMeMoreClick);