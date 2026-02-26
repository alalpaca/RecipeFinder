# PRD of Recipe_finder

## Project Name

**Recipe Finder -- Single Page Application (SPA)**

------------------------------------------------------------------------

## 1. Background & Objective

### 1.1 Project Background

1.\
The goal is to build a frontend Single Page Application (SPA) that
allows users to search for recipes using TheMealDB API.\
The project is frontend-only and does not include any backend server.

### 1.2 Objectives

-   Build interactive web pages using HTML, CSS, and JavaScript
-   Consume RESTful APIs and parse JSON responses
-   Use Fetch API with async/await for asynchronous programming
-   Perform DOM manipulation to dynamically update page content
-   Build an SPA without using any frontend frameworks

------------------------------------------------------------------------

## 2. Scope

### 2.1 In Scope

-   Recipe keyword search
-   Display search results as a grid of cards
-   Display detailed recipe view
-   Page state management without full page refresh
-   Docker containerization
-   Deployment to Google Cloud Run

### 2.2 Out of Scope

-   Backend server development (Flask, Node.js, etc.)
-   Authentication system
-   Database storage
-   Frontend frameworks (React, Vue, Angular, etc.)
-   CSS libraries (Bootstrap, Tailwind, etc.)

------------------------------------------------------------------------

## 3. Target Users

-   General users who want to search for recipes
-   Course instructor and TAs for grading

------------------------------------------------------------------------

## 4. Functional Requirements

### 4.1 Home Page -- Search Function

#### UI Components

-   Text Input: Users enter meal name (e.g., Chicken, Pasta, Arrabiata)
-   Search Button: Triggers search request

#### Functional Behavior

1.  User enters keyword and clicks Search
2.  If input is empty:
    -   Display validation error message
3.  Call API:
    https://www.themealdb.com/api/json/v1/1/search.php?s={query}
4.  Display loading state while waiting for response
5.  Render results after response

------------------------------------------------------------------------

### 4.2 Search Results View

#### Display Format

Results must be shown in a grid of cards.

#### Each Card Must Include

-   Meal Thumbnail
-   Meal Name
-   Category

#### States

-   If no results: Display "No recipes found. Try a different search
    term."
-   Show loading indicator during API request

------------------------------------------------------------------------

### 4.3 Recipe Detail View

When user clicks a meal card, display detailed view without refreshing
page.

#### Must Include

-   Full Image
-   Meal Name (as heading)
-   Category
-   Area (Cuisine)
-   Ingredients List (strIngredient1--20 + strMeasure1--20)
-   Instructions (strInstructions)
-   YouTube link (if available, open in new tab)
-   Back to Results button (must preserve previous results)

------------------------------------------------------------------------

### 4.4 Lookup by Meal ID

Use endpoint:
https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}

------------------------------------------------------------------------

## 5. Non-Functional Requirements

### Technical Constraints

-   Must use fetch() API
-   Must use async/await or Promises
-   No frontend frameworks allowed
-   No CSS libraries allowed
-   Must work in latest Google Chrome

### Deployment Requirements

-   Must use Docker
-   Base image: nginx:alpine
-   Container must listen on port 8080
-   Must deploy to Google Cloud Run
-   Must allow unauthenticated access

------------------------------------------------------------------------

## 6. Required Project Structure

    project/
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── app.js
    ├── Dockerfile
    └── nginx.conf

------------------------------------------------------------------------

## 7. User Flow

1.  User opens homepage
2.  User enters keyword
3.  Clicks Search
4.  Loading indicator appears
5.  Results grid displays
6.  User clicks a card
7.  Detail page displays
8.  User clicks Back to Results
9.  Previous results restored

------------------------------------------------------------------------

## 8. Acceptance Criteria

-   Empty input shows validation error
-   Search displays card grid
-   No results shows friendly message
-   Detail view displays all required fields
-   YouTube link opens in new tab
-   Back button preserves results

------------------------------------------------------------------------

## 9. Risks & Edge Cases

  Risk                      Mitigation
  ------------------------- -------------------------------
  API returns null          Display no results message
  Network failure           Display error message
  Empty ingredient fields   Filter out empty values
  Missing YouTube link      Hide video section
  Multiple rapid clicks     Disable button during request

------------------------------------------------------------------------