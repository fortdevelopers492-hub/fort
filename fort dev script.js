/**
 * Fort Developers - Operational Control Engine
 * Architecture Context Scope Management Layer
 */

// Centralized State Management Store
let appState = {
    isAdminAuthenticated: false,
    activeEditContext: {
        sectionId: null,
        targetFieldId: null,
        displayElementId: null
    },
    // Initial dynamic catalog repository layout array mapping
    extendedWebsites: []
};

// Global DOM Utility Elements Handler Mapping
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        // Reset functional runtime login alert feedback flags if needed
        if (modalId === 'admin-modal') {
            document.getElementById('admin-login-error').classList.add('hidden-node');
            document.getElementById('admin-login-form').reset();
            document.getElementById('admin-password').type = 'password';
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Security Vector Logic Handler Operations
function togglePasswordVisibility(fieldId) {
    const pwdField = document.getElementById(fieldId);
    if (pwdField) {
        pwdField.type = pwdField.type === 'password' ? 'text' : 'password';
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    
    const identityInput = document.getElementById('admin-email').value.trim();
    const passwordInput = document.getElementById('admin-password').value;
    const errorFrame = document.getElementById('admin-login-error');

    // Strict validation mapping criteria configuration metrics
    if (identityInput === 'fortdevelopers492@gmail.com' && passwordInput === 'Fort492#') {
        appState.isAdminAuthenticated = true;
        errorFrame.classList.add('hidden-node');
        closeModal('admin-modal');
        activateAdministrativeWorkspace();
    } else {
        errorFrame.classList.remove('hidden-node');
    }
}

// Elevated Privilege UI Manifestation Workspace
function activateAdministrativeWorkspace() {
    // Surface Management FAB tools execution loops
    document.getElementById('admin-fab').classList.remove('hidden');
    document.getElementById('admin-status-indicator').classList.remove('hidden');
    document.getElementById('admin-auth-trigger').classList.add('hidden');

    // Uncover Pencil nodes over matching explicit context selectors
    const pencilButtons = document.querySelectorAll('.btn-sm-pencil');
    pencilButtons.forEach(btn => btn.classList.remove('hidden'));
}

// Administrative Extension Logic Components Module
function handleLogoPreview(event, previewImgId) {
    const input = event.target;
    const preview = document.getElementById(previewImgId);
    const placeholder = document.getElementById('preview-placeholder');

    if (input.files && input.files[0]) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
        };
        fileReader.readAsDataURL(input.files[0]);
    }
}

function handleCreateWebsite(event) {
    event.preventDefault();

    const name = document.getElementById('new-web-name').value.trim();
    const info = document.getElementById('new-web-info').value.trim();
    const logoSrc = document.getElementById('new-logo-preview').src;

    // Create algorithmic runtime unique identifier token mappings
    const sanitizedId = 'sec-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const newWebsitePayload = {
        id: sanitizedId,
        name: name,
        info: info,
        logo: logoSrc
    };

    appState.extendedWebsites.push(newWebsitePayload);
    
    // Execute global node pipeline layout propagation routines
    appendWebsiteToDOM(newWebsitePayload);
    
    // Clear elements stack structures state contexts
    document.getElementById('add-website-form').reset();
    document.getElementById('new-logo-preview').style.display = 'none';
    if(document.getElementById('preview-placeholder')) {
        document.getElementById('preview-placeholder').style.display = 'block';
    }
    closeModal('add-website-modal');
}

function appendWebsiteToDOM(site) {
    // 1. Inject Redirect Navigation Map inside Table of Contents Section
    const tocContainer = document.getElementById('toc-list');
    const tocLi = document.createElement('li');
    tocLi.innerHTML = `<a href="#${site.id}">${site.name}</a>`;
    tocContainer.appendChild(tocLi);

    // 2. Inject Discover Item Anchor Grid Card in More From Fort Grid Module Block
    const gridContainer = document.getElementById('more-from-fort-grid');
    const cardNode = document.createElement('div');
    cardNode.className = 'product-item-card-container rounded-rect';
    cardNode.setAttribute('onclick', `window.location.hash='#${site.id}'`);
    cardNode.innerHTML = `
        <div class="product-card-image-box">
            <img src="${site.logo}" alt="${site.name}">
        </div>
        <div class="product-card-details-block text-center">
            <span class="product-card-title">${site.name}</span>
        </div>
    `;
    gridContainer.appendChild(cardNode);

    // 3. Construct Standard Viewport Website Section Node Block Frame Layer Stack
    const webContainer = document.getElementById('dynamic-websites-container');
    const sectionNode = document.createElement('section');
    sectionNode.id = site.id;
    sectionNode.className = 'view-page bg-white-pure border-top-divider';
    
    // Maintain internal state context bindings dynamically mapping runtime updates
    const titleTextId = `title-text-${site.id}`;
    const infoTextId = `info-text-${site.id}`;

    sectionNode.innerHTML = `
        <div class="section-content-wrapper website-section-layout">
            <div class="website-meta-side">
                <div class="large-avatar-frame rounded-rect">
                    <img src="${site.logo}" alt="${site.name} Logo">
                </div>
                <div class="website-info-block">
                    <div class="header-inline-edit-row">
                        <h3 id="${titleTextId}">${site.name}</h3>
                        <button class="btn-sm-pencil" onclick="openWebsiteEditModal('${site.id}', '${titleTextId}', '${infoTextId}')">✏️ Edit</button>
                    </div>
                    <p id="${infoTextId}" class="margin-top-xs">${site.info}</p>
                </div>
            </div>
            <div class="margin-top-md">
                <button class="btn-blue" onclick="window.open('#', '_blank')">Visit Website</button>
            </div>
        </div>
    `;
    webContainer.appendChild(sectionNode);
}

// Context Parameterized Data Modifiers Actions Handlers Workspace
function openCcEditModal(label, currentVal, elementId) {
    appState.activeEditContext.sectionId = 'customer-care';
    appState.activeEditContext.targetFieldId = null;
    appState.activeEditContext.displayElementId = elementId;

    document.getElementById('edit-modal-headline').innerText = `Modify ${label} Line`;
    document.getElementById('edit-field-label').innerText = `${label} Target Contact String`;
    document.getElementById('edit-field-input').value = document.getElementById(elementId).innerText;
    
    openModal('edit-field-modal');
}

function openWebsiteEditModal(sectionId, titleId, infoId) {
    appState.activeEditContext.sectionId = sectionId;
    appState.activeEditContext.targetFieldId = titleId; // Dynamic fallback reference mapping
    appState.activeEditContext.displayElementId = infoId;

    const titleStr = document.getElementById(titleId).innerText;
    document.getElementById('edit-modal-headline').innerText = `Edit: ${titleStr}`;
    document.getElementById('edit-field-label').innerText = `Website Corporate Info Content`;
    document.getElementById('edit-field-input').value = document.getElementById(infoId).innerText;

    openModal('edit-field-modal');
}

function handleFieldUpdate(event) {
    event.preventDefault();
    const updatedValue = document.getElementById('edit-field-input').value.trim();
    const targetElementId = appState.activeEditContext.displayElementId;

    if (targetElementId && updatedValue) {
        document.getElementById(targetElementId).innerText = updatedValue;
    }
    closeModal('edit-field-modal');
}


// Function to update URL and route smoothly to Fort Mart from the main landing page
function loadFortMart() {
    // 1. Change the URL to /fortmart programmatically without resetting JS state
    const targetUrl = window.location.origin + window.location.pathname.replace('index.html', '') + 'fortmart';
    window.history.pushState({ page: 'fortmart' }, 'Fort Mart - Marketplace & Chat', targetUrl);
    
    // 2. Redirect the current frame to display the Fort Mart application file directly
    window.location.href = 'fort mart index.html';
}

// Intercept window load routines to check if the user directly pasted or typed the /fortmart address string
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('/fortmart')) {
        window.location.href = 'fort mart index.html';
    }
});

// --- Fort Suite SPA Router Engine ---

// Run checking routine as soon as the window finishes parsing DOM
window.addEventListener('DOMContentLoaded', () => {
    checkCurrentURLRoute();
});

// Capture browser forward/back buttons actions
window.addEventListener('popstate', () => {
    checkCurrentURLRoute();
});

function checkCurrentURLRoute() {
    const path = window.location.pathname;
    
    // Check if the URL points to /fortmart or if a hash fallback exists
    if (path.endsWith('/fortmart') || window.location.hash === '#fortmart') {
        // If we are currently on the home page index, load Fort Mart
        if (typeof loadFortMart === 'function') {
            loadFortMart();
        } else {
            // If accessing locally or direct file setup, safely shift view
            window.location.href = 'fort mart index.html';
        }
    }
}

// Action: User clicks "Visit Website" inside Main Home Hub
function navigateToFortMart() {
    if (window.location.hostname === "localhost" || window.location.protocol === "file:") {
        // Local machine behavior: Traditional file transition fallback
        window.location.href = 'fort mart index.html';
    } else {
        // Live production deployment behavior (GitHub Pages/Custom Domain)
        // Pushes clean '/fortmart' text onto address bar matrix layout
        history.pushState({ page: 'fortmart' }, 'Fort Mart - Marketplace & Chat', '/fortmart');
        
        // Execute your structural logic payload function
        if (typeof loadFortMart === 'function') {
            loadFortMart();
        } else {
            window.location.href = 'fort mart index.html';
        }
    }
}

// Action: User clicks "Fort Dev Home Page" inside Fort Mart Node
function navigateToHome(event) {
    if (event) event.preventDefault();
    
    if (window.location.hostname === "localhost" || window.location.protocol === "file:") {
        // Local machine fallback
        window.location.href = 'index.html#more-from-fort';
    } else {
        // Production address cleaner back to core domain root url matrix 
        history.pushState({ page: 'home' }, 'Fort Developers', '/');
        window.location.href = 'index.html#more-from-fort';
    }
}

/**
 * Fort Mart Preloader and Progress Meter Controller Hook
 */
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader-container");
    const progressBar = document.getElementById("preloader-progress-bar");
    const progressText = document.getElementById("preloader-percentage-text");

    if (!preloader || !progressBar) return;

    let progress = 0;
    const duration = 3000; // Total loading screen time (3 seconds)
    const intervalTime = 30; // Update step resolution in milliseconds
    const step = (intervalTime / duration) * 100;

    const progressInterval = setInterval(() => {
        progress += step;

        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Turn completely solid blue in its final stage
            progressBar.classList.add("fully-complete");
            progressBar.style.width = "100%";
            progressText.innerText = "Ready!";

            // Smoothly remove preloader after reaching full status
            setTimeout(() => {
                preloader.classList.add("fade-out");
                
                // Let other state machine rendering scripts safely execute after opening
                if (typeof initApplicationState === 'function') {
                    initApplicationState();
                }
            }, 400); // Tiny delay to let the user see the 100% complete state
        } else {
            progressBar.style.width = `${progress}%`;
            progressText.innerText = `Loading ${Math.floor(progress)}%`;

            // Change to complete blue within the last 1-2 seconds of loading 
            if (progress >= 66) { 
                progressBar.classList.add("fully-complete");
            }
        }
    }, intervalTime);
});