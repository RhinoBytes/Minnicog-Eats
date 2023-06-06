// Function to fetch the latest recipes from the server
function fetchLatestRecipes() {
  fetch("/api/latest-recipes")
    .then(response => response.json())
    .then(data => displayLatestRecipes(data))
    .catch(error => console.error("Error fetching latest recipes:", error));
}

// Function to display the latest recipes on the page
function displayLatestRecipes(recipes) {
  const recipesContainer = document.querySelector(".recipes");
  recipesContainer.innerHTML = "<h1>Recipes</h1>";

  recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <h2>${recipe.title}</h2>
      <p>${recipe.description}</p>
    `;

    recipesContainer.appendChild(recipeCard);
  });
}

// Event listener for search form submission
const searchForm = document.querySelector(".search-bar form");
searchForm.addEventListener("submit", handleSearchFormSubmit);

// Function to handle the search form submission
function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchTerm = document.querySelector(".search-bar input").value;

  fetch(`/api/search-recipes?searchTerm=${searchTerm}`)
    .then(response => response.json())
    .then(data => displaySearchResults(data))
    .catch(error => console.error("Error searching recipes:", error));
}

// Function to display the search results on the page
function displaySearchResults(results) {
  const recipesContainer = document.querySelector(".recipes");
  recipesContainer.innerHTML = "<h1>Search Results</h1>";

  const searchResultsContainer = document.createElement("div");
  searchResultsContainer.classList.add("search-results");

  if (results.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No results found.";
    searchResultsContainer.appendChild(noResultsMessage);
  } else {
    results.forEach(recipe => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");
      resultItem.innerHTML = `
        <h2>${recipe.title}</h2>
        <p>${recipe.description}</p>
      `;

      searchResultsContainer.appendChild(resultItem);
    });
  }

  recipesContainer.appendChild(searchResultsContainer);
}

// Fetch the latest recipes from the server
fetchLatestRecipes();