// State Management
const state = {
    lastSearchQuery: '',
    lastSearchResults: null,
    currentView: 'search' // 'search', 'results', 'detail'
};

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const errorMessage = document.getElementById('error-message');
const loading = document.getElementById('loading');
const searchSection = document.getElementById('search-section');
const initialResults = document.getElementById('initial-results');
const resultsSection = document.getElementById('results-section');
const resultsGrid = document.getElementById('results-grid');
const detailSection = document.getElementById('detail-section');
const detailContent = document.getElementById('detail-content');
const backBtn = document.getElementById('back-btn');

// API Endpoints
const SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const LOOKUP_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
backBtn.addEventListener('click', handleBackToResults);

/**
 * Handle search button click
 */
async function handleSearch() {
    const query = searchInput.value.trim();
    
    // Validation
    if (!query) {
        showError('Please enter a search item');
        return;
    }
    
    hideError();
    showLoading();
    hideInitialResults();
    hideResults();
    hideDetail();
    
    // Disable search button during request
    searchBtn.disabled = true;
    
    try {
        const response = await fetch(`${SEARCH_API}${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Handle API response
        if (data.meals === null || data.meals.length === 0) {
            showNoResults();
        } else {
            state.lastSearchQuery = query;
            state.lastSearchResults = data.meals;
            state.currentView = 'results';
            renderResults(data.meals);
        }
    } catch (error) {
        showError('Failed to fetch recipes. Please check your connection and try again.');
        console.error('Search error:', error);
    } finally {
        hideLoading();
        searchBtn.disabled = false;
    }
}

/**
 * Render search results as a grid of cards
 */
function renderResults(meals) {
    resultsGrid.innerHTML = '';
    
    meals.forEach(meal => {
        const card = createMealCard(meal);
        resultsGrid.appendChild(card);
    });
    
    hideInitialResults();
    showResults();
}

/**
 * Create a meal card element
 */
function createMealCard(meal) {
    const card = document.createElement('div');
    card.className = 'meal-card';
    card.addEventListener('click', () => showMealDetail(meal.idMeal));
    
    card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-card-info">
            <h3>${escapeHtml(meal.strMeal)}</h3>
            <p class="category">${escapeHtml(meal.strCategory || 'Unknown')}</p>
        </div>
    `;
    
    return card;
}

/**
 * Show meal detail view
 */
async function showMealDetail(mealId) {
    showLoading();
    hideResults();
    hideDetail();
    
    try {
        const response = await fetch(`${LOOKUP_API}${mealId}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        if (data.meals && data.meals.length > 0) {
            const meal = data.meals[0];
            renderMealDetail(meal);
            state.currentView = 'detail';
            showDetail();
        } else {
            showError('Recipe details not found.');
        }
    } catch (error) {
        showError('Failed to fetch recipe details. Please try again.');
        console.error('Detail error:', error);
    } finally {
        hideLoading();
    }
}

/**
 * Render detailed meal view
 */
function renderMealDetail(meal) {
    // Parse ingredients and measurements
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : ''
            });
        }
    }
    
    // Build ingredients list HTML
    const ingredientsHtml = ingredients.map(item => {
        const text = item.measure ? `${item.measure} ${item.ingredient}` : item.ingredient;
        return `<li>${escapeHtml(text)}</li>`;
    }).join('');
    
    // Build YouTube link if available
    let youtubeHtml = '';
    if (meal.strYoutube && meal.strYoutube.trim()) {
        youtubeHtml = `
            <div class="youtube-section">
                <a href="${escapeHtml(meal.strYoutube)}" target="_blank" rel="noopener noreferrer" class="youtube-link">
                    Watch on Youtube
                </a>
            </div>
        `;
    }
    
    // Layout: Image on LEFT, Info on RIGHT
    detailContent.innerHTML = `

        <div class="detail-layout">
            <div class="detail-image-col">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="detail-info-col">
                <h2>${escapeHtml(meal.strMeal)}</h2>
                <div class="detail-meta">
                    <span>${escapeHtml(meal.strCategory || 'Unknown')}</span>
                    <span>${escapeHtml(meal.strArea || 'Unknown')}</span>
                </div>
                <div class="ingredients-section">
                    <h3>Ingredients</h3>
                    <ul class="ingredients-list">
                        ${ingredientsHtml}
                    </ul>
                </div>
                <div class="instructions-section">
                    <h3>Instructions</h3>
                    <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 15px;">
                    <p>${escapeHtml(meal.strInstructions || 'No instructions available.')}</p>
                </div>
                ${youtubeHtml}
            </div>
        </div>
    `;
}

/**
 * Handle back to results button click
 */
function handleBackToResults() {
    if (state.lastSearchResults) {
        renderResults(state.lastSearchResults);
        state.currentView = 'results';
        showResults();
        hideDetail();
    } else {
        // If no previous results, go back to search
        state.currentView = 'search';
        hideDetail();
        hideResults();
    }
}

/**
 * Show/hide UI elements
 */
function showLoading() {
    loading.style.display = 'block';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showResults() {
    resultsSection.style.display = 'block';
}

function hideResults() {
    resultsSection.style.display = 'none';
}

function showDetail() {
    detailSection.style.display = 'block';
}

function hideDetail() {
    detailSection.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function showInitialResults() {
    if (initialResults) {
        initialResults.style.display = 'block';
    }
}

function hideInitialResults() {
    if (initialResults) {
        initialResults.style.display = 'none';
    }
}

function showNoResults() {
    resultsGrid.innerHTML = '<div class="no-results">No recipes found. Try a different search term.</div>';
    hideInitialResults();
    showResults();
    state.currentView = 'results';
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
