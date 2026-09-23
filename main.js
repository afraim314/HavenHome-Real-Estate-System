// js/main.js
// API Base URL
const API_BASE = 'http://localhost:5000/api';

// Load featured properties on home page
async function loadFeaturedProperties() {
    try {
        // Get first 6 properties as featured
        const response = await fetch(`${API_BASE}/properties?limit=6`);
        const data = await response.json();
        
        console.log('Featured properties response:', data);

        const properties = data.properties || [];
        const propertiesGrid = document.getElementById('featuredProperties');

        if (propertiesGrid && properties.length > 0) {
            propertiesGrid.innerHTML = properties.map(property => `
                <div class="property-card">
                    <img src="${property.images && property.images[0] ? property.images[0] : 'https://via.placeholder.com/300x200'}" alt="${property.title}" class="property-image">
                    <div class="property-info">
                        <h3 class="property-title">${property.title}</h3>
                        <div class="property-price">TK ${property.price ? property.price.toLocaleString() : 'N/A'}</div>
                        <div class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</div>
                        <div class="property-details">
                            <span><i class="fas fa-bed"></i> ${property.bedrooms} beds</span>
                            <span><i class="fas fa-bath"></i> ${property.bathrooms} baths</span>
                            <span><i class="fas fa-vector-square"></i> ${property.size} sqft</span>
                        </div>
                        <a href="properties.html?id=${property.id}" class="btn">View Details</a>
                    </div>
                </div>
            `).join('');
        } else if (propertiesGrid) {
            // Show sample properties if no data from backend
            propertiesGrid.innerHTML = `
                <div class="property-card">
                    <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Modern Apartment" class="property-image">
                    <div class="property-info">
                        <h3 class="property-title">Modern Downtown Apartment</h3>
                        <div class="property-price">TK 25,00,000</div>
                        <div class="property-location"><i class="fas fa-map-marker-alt"></i> Gulshan, Dhaka</div>
                        <div class="property-details">
                            <span><i class="fas fa-bed"></i> 3 beds</span>
                            <span><i class="fas fa-bath"></i> 2 baths</span>
                            <span><i class="fas fa-vector-square"></i> 1200 sqft</span>
                        </div>
                        <a href="properties.html" class="btn">View Details</a>
                    </div>
                </div>
                <div class="property-card">
                    <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Luxury Villa" class="property-image">
                    <div class="property-info">
                        <h3 class="property-title">Luxury Villa with Garden</h3>
                        <div class="property-price">TK 85,00,000</div>
                        <div class="property-location"><i class="fas fa-map-marker-alt"></i> Baridhara, Dhaka</div>
                        <div class="property-details">
                            <span><i class="fas fa-bed"></i> 4 beds</span>
                            <span><i class="fas fa-bath"></i> 3 baths</span>
                            <span><i class="fas fa-vector-square"></i> 2500 sqft</span>
                        </div>
                        <a href="properties.html" class="btn">View Details</a>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading properties:', error);
        // Fallback to sample data
        loadSampleProperties();
    }
}

// Fallback sample properties
function loadSampleProperties() {
    const propertiesGrid = document.getElementById('featuredProperties');
    if (propertiesGrid) {
        propertiesGrid.innerHTML = `
            <div class="property-card">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Modern Apartment" class="property-image">
                <div class="property-info">
                    <h3 class="property-title">Modern Downtown Apartment</h3>
                    <div class="property-price">TK 25,00,000</div>
                    <div class="property-location"><i class="fas fa-map-marker-alt"></i> Gulshan, Dhaka</div>
                    <div class="property-details">
                        <span><i class="fas fa-bed"></i> 3 beds</span>
                        <span><i class="fas fa-bath"></i> 2 baths</span>
                        <span><i class="fas fa-vector-square"></i> 1200 sqft</span>
                    </div>
                    <a href="properties.html" class="btn">View Details</a>
                </div>
            </div>
            <div class="property-card">
                <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Luxury Villa" class="property-image">
                <div class="property-info">
                    <h3 class="property-title">Luxury Villa with Garden</h3>
                    <div class="property-price">TK 85,00,000</div>
                    <div class="property-location"><i class="fas fa-map-marker-alt"></i> Baridhara, Dhaka</div>
                    <div class="property-details">
                        <span><i class="fas fa-bed"></i> 4 beds</span>
                        <span><i class="fas fa-bath"></i> 3 baths</span>
                        <span><i class="fas fa-vector-square"></i> 2500 sqft</span>
                    </div>
                    <a href="properties.html" class="btn">View Details</a>
                </div>
            </div>
        `;
    }
}

// Search functionality
document.getElementById('searchForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const location = document.getElementById('location').value;
    const propertyType = document.getElementById('propertyType').value;
    const priceRange = document.getElementById('priceRange').value;
    const bedrooms = document.getElementById('bedrooms').value;
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('propertyType', propertyType);
    if (bedrooms) params.append('bedrooms', bedrooms);
    
    if (priceRange) {
        if (priceRange.endsWith('+')) {
            params.append('minPrice', priceRange.replace('+', ''));
        } else {
            const [min, max] = priceRange.split('-');
            if (min) params.append('minPrice', min);
            if (max) params.append('maxPrice', max);
        }
    }
    
    window.location.href = `properties.html?${params.toString()}`;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Auth functions
function setAuthToken(token) {
    localStorage.setItem('token', token);
}

function getAuthToken() {
    return localStorage.getItem('token');
}

function isAuthenticated() {
    return !!getAuthToken();
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProperties();
    
    // Check authentication status
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
        // Show admin-specific elements
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
    }
});