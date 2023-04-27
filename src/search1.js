const form = document.querySelector('form');
const searchTermInput = document.querySelector('#search-term');
const durationInput = document.querySelector('#duration');
const explicitInput = document.querySelector('#explicit');
const searchBtn = document.querySelector('#search-btn');
const clearFiltersBtn = document.querySelector('#clear-filters-btn');
const resultsDiv = document.querySelector('#results');

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = searchTermInput.value;
  if (!searchTerm) return;
  search(searchTerm);
});

clearFiltersBtn.addEventListener('click', e => {
  durationInput.value = '';
  explicitInput.value = '';
  const searchTerm = searchTermInput.value;
  if (!searchTerm) return;
  search(searchTerm);
});

async function search(term) {
  const duration = durationInput.value;
  const explicit = explicitInput.value;
  let url = `https://itunes.apple.com/search?term=${term}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    let filteredResults = data.results;
    if (duration) {
      filteredResults = filteredResults.filter(result => {
        return result.trackTimeMillis / 1000 / 60 <= duration;
      });
    }
    if (explicit) {
      filteredResults = filteredResults.filter(result => {
        return result.trackExplicitness.toLowerCase() === explicit.toLowerCase();
      });
    }
    if (filteredResults.length === 0) {
      resultsDiv.innerHTML = '<p>No results found</p>';
    } else {
      displayResults(filteredResults);
    }
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = '<p>An error occurred</p>';
  }
}


function displayResults(results) {
  resultsDiv.innerHTML = '';
  for (let i = 0; i < Math.min(results.length, 10); i++) {
    const result = results[i];

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    const img = document.createElement('img');
    img.src = result.artworkUrl100;
    img.alt = result.collectionName;

    const h3 = document.createElement('h3');
    h3.textContent = result.trackName;

    const p1 = document.createElement('p');
    p1.textContent = result.artistName;

    const p2 = document.createElement('p');
    p2.textContent = result.collectionName;

    const audio = document.createElement('audio');
    if (result.previewUrl) {
      audio.controls = true;
      const source = document.createElement('source');
      source.src = result.previewUrl;
      audio.appendChild(source);
    } else {
      p2.textContent += ' (No Preview Available)';
    }

    resultDiv.appendChild(img);
    resultDiv.appendChild(h3);
    resultDiv.appendChild(p1);
    resultDiv.appendChild(p2);
    resultDiv.appendChild(audio);

    resultsDiv.appendChild(resultDiv);
  }
}

