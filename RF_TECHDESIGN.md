# Technical Design Document (TECHDESIGN)

## Project Name

Recipe Finder -- Single Page Application (SPA)

------------------------------------------------------------------------

# 1. System Overview

Recipe Finder is a frontend-only Single Page Application (SPA) that
allows users to search for recipes using TheMealDB public API.\
The application is built using vanilla HTML, CSS, and JavaScript,
containerized with Docker, and deployed to Google Cloud Run using NGINX.

There is no backend server. All API calls are made directly from the
browser to TheMealDB API.

------------------------------------------------------------------------

# 2. Technology Stack

## 2.1 Frontend

-   HTML5 -- Page structure
-   CSS3 -- Styling and layout (custom CSS only)
-   JavaScript (ES6+) -- Application logic
-   Fetch API -- API communication
-   Async/Await -- Asynchronous request handling
-   DOM Manipulation -- Dynamic content rendering

Restrictions: - No frontend frameworks (React, Vue, Angular, etc.) - No
CSS libraries (Bootstrap, Tailwind, etc.) - Must work in latest Google
Chrome

------------------------------------------------------------------------

## 2.2 External API

TheMealDB (Public REST API)

### Search Endpoint

https://www.themealdb.com/api/json/v1/1/search.php?s={query}

### Lookup Endpoint

https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}

Response format: JSON

------------------------------------------------------------------------

## 2.3 Deployment Stack

-   Docker
-   NGINX (nginx:alpine base image)
-   Google Cloud Run
-   Google Cloud Build

Container Requirements: - Must listen on port 8080 - Must allow
unauthenticated access

------------------------------------------------------------------------

# 3. System Architecture

Browser (Client) \| \| fetch() v TheMealDB API (External Service)

Deployment Layer: Docker Container → NGINX → Google Cloud Run

The application runs fully on the client side.\
NGINX serves static files inside the Docker container.

------------------------------------------------------------------------

# 4. Application Architecture

## 4.1 SPA Structure

The application uses a single HTML file (index.html) and dynamically
updates content via JavaScript without page reloads.

Two Main Views: - Search Results View - Recipe Detail View

State is managed in JavaScript variables.

------------------------------------------------------------------------

## 4.2 Core Modules

### 1. Search Module

Responsibilities: - Validate user input - Trigger API request - Show
loading state - Handle empty or error responses

### 2. Results Rendering Module

Responsibilities: - Render card grid - Attach click event listeners -
Store previous search results

### 3. Detail View Module

Responsibilities: - Fetch full recipe data (lookup by ID) - Parse
ingredients & measurements - Render detailed layout - Handle YouTube
link - Return to results

### 4. State Management

Simple in-memory state: - lastSearchQuery - lastSearchResults -
currentView

------------------------------------------------------------------------

# 5. Project Structure

    project/
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── app.js
    ├── Dockerfile
    └── nginx.conf

## File Responsibilities

### index.html

-   Page structure
-   Main container elements
-   Script and stylesheet imports

### css/styles.css

-   Layout (grid system)
-   Card styling
-   Detail page styling
-   Loading indicators

### js/app.js

-   Event listeners
-   Fetch API calls
-   DOM updates
-   View switching logic
-   State management

### Dockerfile

-   Base image: nginx:alpine
-   Copy static files
-   Expose port 8080
-   Start NGINX

### nginx.conf

-   Listen on port 8080
-   Serve index.html
-   Static file routing

------------------------------------------------------------------------

# 6. Data Flow

User Input ↓ Validation ↓ Fetch API Request ↓ JSON Response ↓ DOM
Rendering ↓ User Interaction (Card Click) ↓ Fetch Detail API ↓ Render
Detail View

------------------------------------------------------------------------

# 7. Error Handling Strategy

  Scenario            Handling
  ------------------- ----------------------------
  Empty input         Display validation message
  API returns null    Show "No recipes found"
  Network error       Show error message
  Missing YouTube     Hide video section
  Empty ingredients   Filter null fields

------------------------------------------------------------------------

# 8. Deployment Workflow

1.  Build Docker image
2.  Push image via Cloud Build
3.  Deploy to Google Cloud Run
4.  Enable unauthenticated access
5.  Obtain public HTTPS URL

------------------------------------------------------------------------

# 9. Security Considerations

-   No sensitive data stored
-   No authentication required
-   All communication over HTTPS
-   Input validation to prevent injection in DOM

------------------------------------------------------------------------
