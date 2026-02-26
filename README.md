# Recipe Finder - Single Page Application

A frontend-only Single Page Application (SPA) that allows users to search for recipes using TheMealDB API.

## Features

- Recipe keyword search
- Display search results as a grid of cards
- Detailed recipe view with ingredients and instructions
- Page state management without full page refresh
- Docker containerization
- Ready for deployment to Google Cloud Run

## Project Structure

```
recipe_finder/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom CSS styles
├── js/
│   └── app.js          # Application logic
├── Dockerfile          # Docker configuration
├── nginx.conf          # NGINX configuration
└── README.md           # This file
```

## Technology Stack

- HTML5
- CSS3 (custom styles only)
- JavaScript (ES6+)
- Fetch API with async/await
- Docker (nginx:alpine)
- NGINX

## Local Development

### Using a Simple HTTP Server

You can use Python's built-in HTTP server:

```bash
# Python 3
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Using Docker

Build the Docker image:

```bash
docker build -t recipe-finder .
```

Run the container:

```bash
docker run -p 8080:8080 recipe-finder
```

Then open `http://localhost:8080` in your browser.

## Deployment to Google Cloud Run

1. Build and push the Docker image to Google Container Registry or Artifact Registry
2. Deploy to Cloud Run with port 8080
3. Enable unauthenticated access

## API

This application uses TheMealDB public API:
- Search: `https://www.themealdb.com/api/json/v1/1/search.php?s={query}`
- Lookup: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}`

## Browser Compatibility

Designed to work with the latest Google Chrome browser.
