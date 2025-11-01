console.log("script.js loaded");
let endpoint = "https://api.giphy.com/v1/gifs/search?api_key=DdoeyWowjJgDqhustN7kKkmOxNIWVTlk&q=apple&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips";

// Select container and button elements
const gifContainer = document.querySelector('#gif-container');
const fetchButton = document.querySelector('#fetch-gif-btn');

// Initialize images array
let images = [];

// Function to fetch GIFs from GIPHY API
async function fetchGIFs() {
  const searchTerm = 'apple'; // or any search term
  const url = `https://api.giphy.com/v1/gifs/search?api_key=DdoeyWowjJgDqhustN7kKkmOxNIWVTlk&q=${searchTerm}&limit=10&offset=0&rating=g&lang=en`;

  // good practice to try and catch if something goes wrong(?)
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract original image URLs and store in images array
    images = data.data.map(gif => gif.images.original.url);
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