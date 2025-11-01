console.log("script.js loaded");

// Select container and button elements
const gifContainer = document.querySelector('#gif-container');
const fetchButton = document.querySelector('#fetch-gif-btn');

// Initialize images array
let images = [];

//User-input test
const searchInput = document.querySelector('#search-input');

// Function to fetch GIFs from GIPHY API
async function fetchGIFs() {
  const searchTerm = searchInput.value.trim();
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=DdoeyWowjJgDqhustN7kKkmOxNIWVTlk&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

  // good practice to try and catch if something goes wrong(?)
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    // Extract original image URLs and store in images array
    images = data.data.map(gif => gif.images.original.url);

    // debugging step, shows source GIF links in logs
    console.log(images)
  }
  
  catch (error) {
    console.error('Error fetching GIFs:', error);
  }
}

// Event listener for button
fetchButton.addEventListener('click', async () => {
  // Fetch new GIFs
  await fetchGIFs();

  // Clear previous images
  gifContainer.innerHTML = '';

  // Loop through images array and display GIFs
  for (let imageUrl of images) {
    gifContainer.innerHTML += `<img src="${imageUrl}" class="col-3 mb-3">`;
  }
});