// API Base URL
const API_URL = '/api/pets';

// State
let currentEditId = null;
let allPets = [];

// DOM Elements
const petModal = document.getElementById('petModal');
const petForm = document.getElementById('petForm');
const addPetBtn = document.getElementById('addPetBtn');
const closeModal = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const petsContainer = document.getElementById('petsContainer');
const noPetsMessage = document.getElementById('noPetsMessage');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const filterType = document.getElementById('filterType');
const modalTitle = document.getElementById('modalTitle');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadPets();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    addPetBtn.addEventListener('click', openAddModal);
    closeModal.addEventListener('click', closeModalHandler);
    cancelBtn.addEventListener('click', closeModalHandler);
    petForm.addEventListener('submit', handleFormSubmit);
    searchBtn.addEventListener('click', handleSearch);
    clearSearchBtn.addEventListener('click', clearSearch);
    filterType.addEventListener('change', handleFilter);
    
    window.addEventListener('click', (e) => {
        if (e.target === petModal) {
            closeModalHandler();
        }
    });
}

// Modal Functions
function openAddModal() {
    currentEditId = null;
    modalTitle.textContent = 'Add New Pet';
    petForm.reset();
    petModal.style.display = 'block';
}

function openEditModal(pet) {
    currentEditId = pet._id;
    modalTitle.textContent = 'Edit Pet Details';
    
    document.getElementById('petName').value = pet.name;
    document.getElementById('petType').value = pet.type;
    document.getElementById('petAge').value = pet.age;
    document.getElementById('ownerName').value = pet.owner.name;
    document.getElementById('ownerPhone').value = pet.owner.phone;
    document.getElementById('ownerEmail').value = pet.owner.email || '';
    
    petModal.style.display = 'block';
}

function closeModalHandler() {
    petModal.style.display = 'none';
    petForm.reset();
    currentEditId = null;
}

// CRUD Operations

// CREATE / UPDATE
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const petData = {
        name: document.getElementById('petName').value,
        type: document.getElementById('petType').value,
        age: parseInt(document.getElementById('petAge').value),
        owner: {
            name: document.getElementById('ownerName').value,
            phone: document.getElementById('ownerPhone').value,
            email: document.getElementById('ownerEmail').value
        }
    };
    
    try {
        if (currentEditId) {
            // Update existing pet
            await updatePet(currentEditId, petData);
        } else {
            // Create new pet
            await createPet(petData);
        }
    } catch (error) {
        showToast('Operation failed: ' + error.message, 'error');
    }
}

async function createPet(petData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(petData)
    });
    
    const result = await response.json();
    
    if (result.success) {
        showToast('Pet added successfully!', 'success');
        closeModalHandler();
        loadPets();
    } else {
        throw new Error(result.error);
    }
}

async function updatePet(id, petData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(petData)
    });
    
    const result = await response.json();
    
    if (result.success) {
        showToast('Pet updated successfully!', 'success');
        closeModalHandler();
        loadPets();
    } else {
        throw new Error(result.error);
    }
}

// READ
async function loadPets() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success) {
            allPets = result.data;
            displayPets(allPets);
            updateStats(allPets);
        }
    } catch (error) {
        showToast('Failed to load pets: ' + error.message, 'error');
    }
}

// DELETE
async function deletePet(id) {
    if (!confirm('Are you sure you want to delete this pet record?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Pet deleted successfully!', 'success');
            loadPets();
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        showToast('Failed to delete pet: ' + error.message, 'error');
    }
}

// Display Functions
function displayPets(pets) {
    if (pets.length === 0) {
        petsContainer.style.display = 'none';
        noPetsMessage.style.display = 'block';
        return;
    }
    
    petsContainer.style.display = 'grid';
    noPetsMessage.style.display = 'none';
    
    petsContainer.innerHTML = pets.map(pet => createPetCard(pet)).join('');
    
    // Add event listeners to edit and delete buttons
    pets.forEach(pet => {
        document.getElementById(`edit-${pet._id}`).addEventListener('click', () => openEditModal(pet));
        document.getElementById(`delete-${pet._id}`).addEventListener('click', () => deletePet(pet._id));
    });
}

function createPetCard(pet) {
    const petIcon = pet.type === 'dog' ? '🐕' : '🐈';
    const createdDate = new Date(pet.createdAt).toLocaleDateString();
    
    return `
        <div class="pet-card">
            <div class="pet-card-header">
                <div class="pet-icon">${petIcon}</div>
                <span class="pet-type ${pet.type}">${pet.type}</span>
            </div>
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <div class="pet-details">
                    <div class="detail-row">
                        <span class="detail-label">Age:</span>
                        <span>${pet.age} year${pet.age !== 1 ? 's' : ''}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Owner:</span>
                        <span>${pet.owner.name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone:</span>
                        <span>${pet.owner.phone}</span>
                    </div>
                    ${pet.owner.email ? `
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span>${pet.owner.email}</span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="detail-label">Added:</span>
                        <span>${createdDate}</span>
                    </div>
                </div>
            </div>
            <div class="pet-card-actions">
                <button id="edit-${pet._id}" class="btn btn-edit">Edit</button>
                <button id="delete-${pet._id}" class="btn btn-delete">Delete</button>
            </div>
        </div>
    `;
}

function updateStats(pets) {
    const totalPets = pets.length;
    const totalDogs = pets.filter(pet => pet.type === 'dog').length;
    const totalCats = pets.filter(pet => pet.type === 'cat').length;
    
    document.getElementById('totalPets').textContent = totalPets;
    document.getElementById('totalDogs').textContent = totalDogs;
    document.getElementById('totalCats').textContent = totalCats;
}

// Search and Filter Functions
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        loadPets();
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/search/${encodeURIComponent(query)}`);
        const result = await response.json();
        
        if (result.success) {
            displayPets(result.data);
            updateStats(result.data);
            
            if (result.data.length === 0) {
                showToast('No pets found matching your search', 'error');
            }
        }
    } catch (error) {
        showToast('Search failed: ' + error.message, 'error');
    }
}

function clearSearch() {
    searchInput.value = '';
    filterType.value = 'all';
    loadPets();
}

function handleFilter() {
    const filterValue = filterType.value;
    
    if (filterValue === 'all') {
        displayPets(allPets);
        updateStats(allPets);
    } else {
        const filteredPets = allPets.filter(pet => pet.type === filterValue);
        displayPets(filteredPets);
        updateStats(filteredPets);
    }
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}
