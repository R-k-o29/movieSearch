document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("search-input").value;
  fetch(`http://www.omdbapi.com/?s=${query}&apikey=62bd0bdf`)
    .then((response) => response.json())
    .then((data) => {
      const resultsContainer = document.getElementById("results-container");
      resultsContainer.innerHTML = "";
      data.Search.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.className = "movie";
        movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                    <button onclick="showDetails('${movie.imdbID}')">More Info</button>
                `;
        resultsContainer.appendChild(movieElement);
      });
    })
    .catch((error) => console.error("Error:", error));
});

function showDetails(imdbID) {
  fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=62bd0bdf`)
    .then((response) => response.json())
    .then((data) => {
      const movieDetails = document.getElementById("movie-details");
      movieDetails.innerHTML = `
                <h2>${data.Title}</h2>
                <p><strong>Year:</strong> ${data.Year}</p>
                <p><strong>Director:</strong> ${data.Director}</p>
                <p><strong>Actors:</strong> ${data.Actors}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
            `;
      document.getElementById("modal").style.display = "block";
    })
    .catch((error) => console.error("Error:", error));
}

document.querySelector(".close-button").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

window.onclick = function (event) {
  if (event.target == document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
};
