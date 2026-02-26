# Recipe Finder SPA Development Guide

## Project Overview

Frontend-only Single Page Application (SPA) that searches and displays
recipes using TheMealDB API.\
Built with vanilla HTML, CSS, and JavaScript.\
Deployed using Docker + NGINX to Google Cloud Run.

------------------------------------------------------------------------

## Tech Stack

-   HTML5
-   CSS3 (custom styles only)
-   JavaScript (ES6+)
-   Fetch API with async/await
-   Docker (nginx:alpine)
-   Google Cloud Run

------------------------------------------------------------------------

## Development Rules

-   No frontend frameworks (React, Vue, Angular, etc.)
-   No CSS libraries (Bootstrap, Tailwind, etc.)
-   Use fetch() for all API calls
-   Use async/await for asynchronous logic
-   Use DOM manipulation for dynamic rendering
-   Keep code modular and well-commented

------------------------------------------------------------------------

## Application Structure

-   Single `index.html` (SPA)
-   `styles.css` for layout and card styling
-   `app.js` for logic, API calls, and state management
-   Maintain simple in-memory state (search results + current view)

------------------------------------------------------------------------

## UI & UX Requirements

-   Input validation for empty search
-   Loading indicator during API requests
-   Display results as a card grid
-   Detail view must include:
    -   Image
    -   Name
    -   Category
    -   Area
    -   Ingredients + Measurements
    -   Instructions
    -   YouTube link (if available)
-   Back button must preserve previous results

------------------------------------------------------------------------

## Deployment Requirements

-   Must use provided Dockerfile structure
-   Container must listen on port 8080
-   Deploy to Google Cloud Run
-   Enable unauthenticated access

------------------------------------------------------------------------

## Code Quality Guidelines

-   Keep functions small and focused
-   Avoid duplicated logic
-   Handle all edge cases (null API responses, missing fields)
-   Ensure compatibility with latest Google Chrome

------------------------------------------------------------------------

## Important Notes

-   This is an individual assignment
-   Document AI usage in process_log.txt
-   Ensure full understanding of all submitted code
