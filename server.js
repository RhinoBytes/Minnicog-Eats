const express = require("express");
const app = express();
const path = require("path");

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, "client")));

// Simulating server-side functionality

// Example data for latest recipes
const latestRecipes = [
  { title: "Recipe 1", description: "Description of Recipe 1" },
  { title: "Recipe 2", description: "Description of Recipe 2" },
  { title: "Recipe 3", description: "Description of Recipe 3" }
];

// Serve the index.html file for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Serve the recipes.html file for the /recipes route
app.get("/recipes", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "recipes.html"));
});

// Serve the categories.html file for the /categories route
app.get("/categories", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "categories.html"));
});

// Serve the about.html file for the /about route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "about.html"));
});

// Example endpoint to search recipes on the server
app.get("/api/search-recipes", (req, res) => {
  const searchTerm = req.query.searchTerm;

  // Simulating server request delay
  setTimeout(() => {
    // Simulating server-side search functionality
    const searchResult = latestRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.json(searchResult);
  }, 1000);
});

// Serve the index.html file for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});