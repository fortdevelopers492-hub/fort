/**
 * Fort Mart Core Single-Page Application Application State Machine Archetype
 */

// Global App State Data Layer Initialization
let APP_STATE = {
    deviceMode: 'laptop', // runtime options: 'laptop' | 'phone'
    currentUser: null,    // operational profile object reference mapping
    activeViewPage: 'home',
    navbarExpanded: true,
    categoryDrawerOpen: false,
    currentSelectedCategory: 'Trending',
    searchQuery: '',
    chatConfiguration: {
        notificationsEnabled: true,
        autoReplyEnabled: false,
        autoReplyMessageText: "Thank you for contacting us. We will evaluate your query and message you shortly.",
        autoDownloadEnabled: false
    },
    activeChatTargetUserHash: null,
    selectedMessageNodesCollection: [],
    fortAiActiveTaggedProductObject: null
};

// Platform Default Core Mock Database Entities Baseline Arrays 
let SYSTEM_DATABASE = {
    users: [
        { uid: "admin", identityName: "Fort Mart Admin", accountType: "business", country: "Nigeria", dialingCode: "+234", identifierText: "Fort Mart", secretKey: "Fortmart492#", avatar: "fort mart logo.png", businessName: "Fort Mart Core Operations", businessInfo: "Primary global system marketplace monitoring profile." },
        { uid: "user_sarah", identityName: "Sarah Enterprise Hub", accountType: "business", country: "Nigeria", dialingCode: "+234", identifierText: "08143329903", secretKey: "Sarah123!", avatar: "", businessName: "Sarah Logistics & Supply", businessInfo: "Top tier importer of premium consumer electronics products."  },
        { uid: "user_john", identityName: "John Mark", accountType: "personal", country: "Nigeria", dialingCode: "+234", identifierText: "john@gmail.com", secretKey: "John456!", avatar: "" }
    ],
    products: [
        { pid: "p1", ownerUid: "user_sarah", name: "Premium Noise-Cancelling Headphones", category: "Electrical Appliances", info: "High fidelity wireless noise isolating audio headphones with dynamic surround drivers.", price: 45000, coverPhoto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003366'><path d='M12 2c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z'/></svg>", aiInfo: "Features 40hr battery life, ANC processing chipsets, and Bluetooth 5.2 architecture components.", clickCount: 142 },
        { pid: "p2", ownerUid: "user_sarah", name: "Smart OLED Television Set 4K", category: "Electrical Appliances", info: "Ultra thin 55 inch high refresh gaming entertainment screen with integrated processing units.", price: 320000, coverPhoto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003366'><path d='M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z'/></svg>", aiInfo: "HDR10+ decoding ready, 120Hz micro-dimming array setups, integrated WebOS hub.", clickCount: 98 }
    ],
    chats: [
        { chatId: "chat_sarah_john", dynamicParticipants: ["user_sarah", "user_john"], messageLog: [
            { mid: "m1", senderUid: "user_john", text: "Hello! Is the 4K OLED TV unit price structure negotiable?", timestamp: "10:14 AM", status: "seen" },
            { mid: "m2", senderUid: "user_sarah", text: "Hello John, pricing schemes are fixed but we offer logistics distribution allowances.", timestamp: "10:16 AM", status: "seen" }
        ]}
    ],
    platformFeedback: [],
    networkSuiteEntities: [
        { siteId: "s1", logo: "Fort AI Logo.png", name: "Fort AI System Assistant Node", info: "Advanced cognitive artificial intelligence analytical interface running backend automation tasks.", url: "https://fortai.example.tech" }
    ]
};

// Ensure leaderboard array structure exists within system storage layers
if (!SYSTEM_DATABASE.pinnedLeaderboard) {
    SYSTEM_DATABASE.pinnedLeaderboard = []; // Max 20 slots containing product 'pid' strings
}

/**
 * Persists and commits state updates across database abstraction wrappers
 */
function administrativeSaveAndRefreshDisplay(activeProductId = null) {
    if (typeof syncPlatformDatabaseStateToWebStorage === "function") {
        syncPlatformDatabaseStateToWebStorage();
    } else if (typeof commitDatabasesStateToLocalStorage === "function") {
        commitDatabasesStateToLocalStorage();
    }
    
    // Refresh display elements instantly
    renderMarketplaceProductsDisplayLoop();
    
    // Re-render open modal windows to accurately update contextual status layouts
    if (activeProductId) {
        launchComprehensiveProductSpecificationsExpandedModalView(activeProductId);
    }
}

// Local Storage Baseline State Synchronization Functions
function syncPlatformDatabaseStateToWebStorage() {
    localStorage.setItem("FORT_MART_DB_STATE", JSON.stringify(SYSTEM_DATABASE));
}
function loadPlatformDatabaseStateFromWebStorage() {
    const cachedStateData = localStorage.getItem("FORT_MART_DB_STATE");
    if(cachedStateData) {
        SYSTEM_DATABASE = JSON.parse(cachedStateData);
    }
}

// System Init Bootstrap Hooks Lifecycle Engine Activation Loop
window.addEventListener("DOMContentLoaded", () => {
    loadPlatformDatabaseStateFromWebStorage();
    renderMarketplaceProductsDisplayLoop();
    buildCategoryRibbonFilterInterfaceElements();
    populateNetworkSuiteExtensionsDisplayView();
});

/**
 * Structural Architecture, Layout & View Rendering Module Engines
 */
function setDeviceMode(selectedMode) {
    APP_STATE.deviceMode = selectedMode;
    document.body.className = (selectedMode === 'laptop') ? 'mode-laptop' : 'mode-phone';
    closeActiveModalDirectly('device-modal');
}

function toggleSideDrawer() {
    const drawerNode = document.getElementById("side-drawer");
    if(APP_STATE.deviceMode === 'phone') {
        drawerNode.classList.toggle("active-phone-drawer");
    } else {
        drawerNode.classList.toggle("closed");
    }
}

function toggleNavbarHeight() {
    const navbarNode = document.getElementById("top-navbar");
    APP_STATE.navbarExpanded = !APP_STATE.navbarExpanded;
    if(APP_STATE.navbarExpanded) {
        navbarNode.classList.remove("relapsed-nav");
    } else {
        navbarNode.classList.add("relapsed-nav");
    }
}

function navigateToPage(targetPageId) {
    // Intercept Gate: Require validation state before access maps logic blocks
    if(!APP_STATE.currentUser && targetPageId !== 'home') {
        triggerAuthenticationModalSequence();
        return;
    }
    
    // Hide all architectural pages views nodes
    document.querySelectorAll(".view-page").forEach(page => {
        page.classList.add("hidden-view");
        page.classList.remove("active-view");
    });
    
    const targetedPageElement = document.getElementById(`page-${targetPageId}`);
    if(targetedPageElement) {
        targetedPageElement.classList.add("active-view");
        targetedPageElement.classList.remove("hidden-view");
        APP_STATE.activeViewPage = targetPageId;
    }
    
    // Close phone responsive side layouts drawer automatically upon completion
    if(APP_STATE.deviceMode === 'phone') {
        document.getElementById("side-drawer").classList.remove("active-phone-drawer");
    }
    
    // Update structural layouts dynamically based on sub page scopes
    const searchBarPlaceholder = document.getElementById("global-search-bar");
    if(targetPageId === 'home') {
        searchBarPlaceholder.placeholder = "Search Products……";
    } else if(targetPageId === 'messages') {
        searchBarPlaceholder.placeholder = "Search Chats……";
        renderUserConversationsLogRoster();
    } else if(targetPageId === 'my-account') {
        searchBarPlaceholder.placeholder = "Search Settings……";
        initializeProfileDetailsAccountManagementFieldsValues();
    } else if(targetPageId === 'fort-ai') {
        initializeFortAiChatWindowWorkspace();
    } else if (targetPageId === 'admin-nav-item') 
        renderAdminUsersManagementList();
    
}

/**
 * Complete Universal Modal Step-Workflow Lifecycle Framework Management Core
 */
function displayConfirmationModalOverlayAction(messageStringText, callbackFunctionReference) {
    const confirmModalNode = document.getElementById("confirm-modal");
    document.getElementById("confirm-modal-text").innerText = messageStringText;
    confirmModalNode.classList.add("active");
    
    const yesButtonNode = document.getElementById("confirm-yes-btn");
    const noButtonNode = document.getElementById("confirm-no-btn");
    
    // Unbind prior listeners
    const cleanYesNode = yesButtonNode.cloneNode(true);
    const cleanNoNode = noButtonNode.cloneNode(true);
    yesButtonNode.parentNode.replaceChild(cleanYesNode, yesButtonNode);
    noButtonNode.parentNode.replaceChild(cleanNoNode, noButtonNode);
    
    cleanYesNode.addEventListener("click", () => {
        confirmModalNode.classList.remove("active");
        callbackFunctionReference();
    });
    cleanNoNode.addEventListener("click", () => {
        confirmModalNode.classList.remove("active");
    });
}

function closeActiveModalDirectly(modalElementId) {
    document.getElementById(modalElementId).classList.remove("active");
}

function closeActiveModalWithConfirmationFlow(modalElementId) {
    displayConfirmationModalOverlayAction("Are you sure you want to exit this window? Progress or entered structural fields changes may be permanently lost.", () => {
        closeActiveModalDirectly(modalElementId);
    });
}

/**
 * Complete User Accounts Authentication Flow Subsystem Management Wizard Module
 */
function triggerAuthenticationModalSequence() {
    renderSignInModalStepContentLayout();
    document.getElementById("auth-modal").classList.add("active");
}

function renderSignInModalStepContentLayout() {
    const wrapperTargetNode = document.getElementById("auth-modal-content");
    wrapperTargetNode.innerHTML = `
        <h2>Sign In to Fort Mart</h2>
        <div class="form-input-container">
            <label>Select Location Context / Dialing Code Line Country:</label>
            <select id="auth-signin-country" class="form-field-control">
                <option value="Nigeria|+234">Nigeria (+234)</option>
            </select>
        </div>
        <div class="form-input-container">
            <label>Input Registered Email Address / Phone Number:</label>
            <input type="text" id="auth-signin-identifier" class="form-field-control" placeholder="Input email address/phone number">
            <div id="err-signin-identifier" class="text-danger-alert hidden-node"></div>
        </div>
        <div class="form-input-container">
            <label>Account Password:</label>
            <input type="password" id="auth-signin-password" class="form-field-control" placeholder="Enter password">
            <div id="err-signin-password" class="text-danger-alert hidden-node"></div>
            <div class="margin-top-xs">
                <input type="checkbox" id="chk-signin-showpass" onchange="toggleFormPasswordFieldVisibility(this, 'auth-signin-password')">
                <label for="chk-signin-showpass" style="font-size:0.85rem; font-weight:400;">Show Password</label>
            </div>
        </div>
        <div class="text-center margin-top-xs">
            <span style="color:var(--fort-blue-light); cursor:pointer; font-size:0.9rem;" onclick="renderForgotPasswordModalWorkflow()">Forgot Password?</span>
        </div>
        <div class="btn-group">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Cancel</button>
            <button onclick="executeAccountSignInAuthenticationRequest()" class="btn-blue">Sign In</button>
        </div>
        <div class="text-center margin-top-sm" style="font-size:0.9rem;">
            <span>Don't have an account? </span><strong style="color:var(--fort-blue-light); cursor:pointer;" onclick="renderSignUpModalWizardStepOne()">Sign up</strong>
        </div>
    `;
}

function toggleFormPasswordFieldVisibility(checkboxElement, targetPasswordFieldId) {
    const passwordField = document.getElementById(targetPasswordFieldId);
    passwordField.type = checkboxElement.checked ? "text" : "password";
}

function executeAccountSignInAuthenticationRequest() {
    const countryRawValue = document.getElementById("auth-signin-country").value.split("|");
    const identifierInput = document.getElementById("auth-signin-identifier").value.trim();
    const passwordInput = document.getElementById("auth-signin-password").value;
    
    const errIdNode = document.getElementById("err-signin-identifier");
    const errPassNode = document.getElementById("err-signin-password");
    errIdNode.classList.add("hidden-node");
    errPassNode.classList.add("hidden-node");
    
    // Find operational account record match
    const accountRecordMatch = SYSTEM_DATABASE.users.find(u => 
        u.dialingCode === countryRawValue[1] && 
        u.identifierText.toLowerCase() === identifierInput.toLowerCase()
    );
    
    if(!accountRecordMatch) {
        errIdNode.innerText = "No registered matching account found for specified credentials within specified region.";
        errIdNode.classList.remove("hidden-node");
        return;
    }
    
    if(accountRecordMatch.secretKey !== passwordInput) {
        errPassNode.innerText = "Incorrect Password.";
        errPassNode.classList.remove("hidden-node");
        return;
    }
    
    // Success State Login Sequence Activation
    APP_STATE.currentUser = accountRecordMatch;
    closeActiveModalDirectly('auth-modal');
    
    // Refresh structural visual nodes dependencies based on admin flag states
    if(accountRecordMatch.uid === 'admin') {
        document.getElementById("admin-nav-item").classList.remove("hidden-admin-node");
        document.getElementById("admin-add-suite-site-btn").classList.remove("hidden-node");
    } else {
        document.getElementById("admin-nav-item").classList.add("hidden-admin-node");
        document.getElementById("admin-add-suite-site-btn").classList.add("hidden-node");
    }
    
    // Render profile interface modifications context arrays
    document.getElementById("nav-user-avatar").src = accountRecordMatch.avatar || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/></svg>";
    
    // Launch Success Overlay Greeting Box
    document.getElementById("welcome-modal").classList.add("active");
    renderMarketplaceProductsDisplayLoop();
}

/** Registration System Multi-step Engine Framework Array */
let SIGNUP_WIZARD_TEMPORARY_OBJECT = {};

function renderSignUpModalWizardStepOne() {
    const wrapperTargetNode = document.getElementById("auth-modal-content");
    wrapperTargetNode.innerHTML = `
        <h3>Sign Up - Provide Contact (Step 1 of 4)</h3>
        <div class="form-input-container margin-top-sm">
            <label>Select Preferred Location:</label>
            <select id="reg-country" class="form-field-control" onchange="evaluateSignUpStepOneFormCompletenessStateValidation()">
                <option value="Nigeria|+234" selected>Nigeria (+234)</option>
                <option value="Ghana|+233">Ghana (+233)</option>
            </select>
        </div>
        <div class="form-input-container">
            <label>Input Primary Authentication Telephone Line or Email Address Structure:</label>
            <input type="text" id="reg-identifier" class="form-field-control" placeholder="Input email address/phone number" oninput="evaluateSignUpStepOneFormCompletenessStateValidation()">
            <div id="err-reg-step1-feedback" class="text-danger-alert hidden-node">Input all information properly</div>
        </div>
        
        <div class="form-checkbox-group-row margin-top-xs">
            <input type="checkbox" id="chk-reg-terms" onchange="evaluateSignUpStepOneFormCompletenessStateValidation()">
            <label for="chk-reg-terms" style="font-size:0.82rem;">I accept the <a href="fort mart terms and conditions.html" target="_blank">terms and conditions</a></label>
        </div>
        <div class="form-checkbox-group-row margin-top-xs">
            <input type="checkbox" id="chk-reg-privacy" onchange="evaluateSignUpStepOneFormCompletenessStateValidation()">
            <label for="chk-reg-privacy" style="font-size:0.82rem;">I accept the <a href="fort mart privacy policy.html" target="_blank">privacy policy</a></label>
        </div>

        <div class="btn-group margin-top-md">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Cancel</button>
            <button id="btn-signup-step1-next" onclick="executeProcessSignUpStepOneNextSequenceAction()" class="btn-blue faintly-colored" disabled>Next</button>
        </div>
    `;
}

function evaluateSignUpStepOneFormCompletenessStateValidation() {
    const identifierTextVal = document.getElementById("reg-identifier").value.trim();
    const termsAcceptedFlag = document.getElementById("chk-reg-terms").checked;
    const privacyAcceptedFlag = document.getElementById("chk-reg-privacy").checked;
    const nextButtonNode = document.getElementById("btn-signup-step1-next");
    
    if(identifierTextVal.length > 4 && termsAcceptedFlag && privacyAcceptedFlag) {
        nextButtonNode.disabled = false;
        nextButtonNode.classList.remove("faintly-colored");
    } else {
        nextButtonNode.disabled = true;
        nextButtonNode.classList.add("faintly-colored");
    }
}

function executeProcessSignUpStepOneNextSequenceAction() {
    const countryRawVal = document.getElementById("reg-country").value.split("|");
    const identifierInputVal = document.getElementById("reg-identifier").value.trim();
    const errFieldFeedback = document.getElementById("err-reg-step1-feedback");
    
    errFieldFeedback.classList.add("hidden-node");
    
    const duplicateMatchCheck = SYSTEM_DATABASE.users.find(u => u.dialingCode === countryRawVal[1] && u.identifierText.toLowerCase() === identifierInputVal.toLowerCase());
    if(duplicateMatchCheck) {
        errFieldFeedback.innerText = "An account is already linked to this phone number/email address. Sign in.";
        errFieldFeedback.classList.remove("hidden-node");
        return;
    }
    
    SIGNUP_WIZARD_TEMPORARY_OBJECT.country = countryRawVal[0];
    SIGNUP_WIZARD_TEMPORARY_OBJECT.dialingCode = countryRawVal[1];
    SIGNUP_WIZARD_TEMPORARY_OBJECT.identifierText = identifierInputVal;
    
    renderSignUpModalWizardStepTwo();
}

function renderSignUpModalWizardStepTwo() {
    const wrapperTargetNode = document.getElementById("auth-modal-content");
    wrapperTargetNode.innerHTML = `
        <h3>Sign Up - Provide Account Info (Step 2 of 4)</h3>
        <div class="form-input-container margin-top-sm">
            <label>Select Profile Structure Classification Paradigm:</label>
            <select id="reg-account-type" class="form-field-control" onchange="toggleSignUpStepTwoClassificationFormsLayout(this.value)">
                <option value="personal" selected>Personal (Consumer) Account</option>
                <option value="business">Business (Commercial) Account</option>
            </select>
        </div>
        
        <div id="signup-dynamic-fields-wrapper">
            <div class="form-input-container">
                <label>Input Full Identity User Display Name:</label>
                <input type="text" id="reg-personal-name" class="form-field-control" placeholder="Enter personal name" oninput="validateSignUpStepTwoDataFormCompleteness()">
            </div>
            <div class="form-input-container">
                <label>Upload Profile Picture (Optional):</label>
                <input type="file" id="reg-avatar-file" class="form-field-control" accept=".png, .jpg, .jpeg" onchange="processSignUpAvatarFileSelection()">
            </div>
            <div id="err-reg-step2-feedback" class="text-danger-alert hidden-node">Input all information properly</div>
        </div>

        <div class="btn-group margin-top-md">
            <button onclick="renderSignUpModalWizardStepOne()" class="btn-gray">Back</button>
            <button id="btn-signup-step2-next" onclick="executeProcessSignUpStepTwoNextSequenceAction()" class="btn-blue faintly-colored" disabled>Next</button>
        </div>
    `;
    SIGNUP_WIZARD_TEMPORARY_OBJECT.avatar = ""; // Initialize empty optional avatar state
    validateSignUpStepTwoDataFormCompleteness();
}

function toggleSignUpStepTwoClassificationFormsLayout(selectedClassificationType) {
    const fieldsWrapper = document.getElementById("signup-dynamic-fields-wrapper");
    if(selectedClassificationType === 'personal') {
        fieldsWrapper.innerHTML = `
            <div class="form-input-container">
                <label>Input Full Identity User Display Name:</label>
                <input type="text" id="reg-personal-name" class="form-field-control" placeholder="Enter personal name" oninput="validateSignUpStepTwoDataFormCompleteness()">
            </div>
            <div class="form-input-container">
                <label>Upload Profile Picture (Optional):</label>
                <input type="file" id="reg-avatar-file" class="form-field-control" accept=".png, .jpg, .jpeg" onchange="processSignUpAvatarFileSelection()">
            </div>
            <div id="err-reg-step2-feedback" class="text-danger-alert hidden-node">Input all information properly</div>
        `;
    } else {
        fieldsWrapper.innerHTML = `
            <div class="form-input-container">
                <label>Corporate Commercial Entity Registered Business Name:</label>
                <input type="text" id="reg-biz-name" class="form-field-control" placeholder="Enter corporate trading identity" oninput="validateSignUpStepTwoDataFormCompleteness()">
            </div>
            <div class="form-input-container">
                <label>Corporate Profile Core Activity Context Bio Summary:</label>
                <input type="text" id="reg-biz-info" class="form-field-control" placeholder="Briefly describe your company summary" oninput="validateSignUpStepTwoDataFormCompleteness()">
            </div>
            <div class="form-input-container">
                <label>Account Manager Authorized Representative Legal Name:</label>
                <input type="text" id="reg-personal-name" class="form-field-control" placeholder="Enter operational manager name" oninput="validateSignUpStepTwoDataFormCompleteness()">
            </div>
            <div class="form-input-container">
                <label>Inventory Specialization / Target Trade Items Classes Description:</label>
                <input type="text" id="reg-biz-deals" class="form-field-control" placeholder="e.g. Mobile Accessories, Clothing apparel, Laptops" oninput="validateSignUpStepTwoDataFormCompleteness()">
            </div>
            <div class="form-input-container">
                <label>Upload Profile Picture (Optional):</label>
                <input type="file" id="reg-avatar-file" class="form-field-control" accept=".png, .jpg, .jpeg" onchange="processSignUpAvatarFileSelection()">
            </div>
            <div id="err-reg-step2-feedback" class="text-danger-alert hidden-node">Input all information properly</div>
        `;
    }
    SIGNUP_WIZARD_TEMPORARY_OBJECT.avatar = ""; // Reset file mapping structural values on switch layouts
    validateSignUpStepTwoDataFormCompleteness();
}

function processSignUpAvatarFileSelection() {
    const fileNode = document.getElementById("reg-avatar-file");
    if(fileNode && fileNode.files && fileNode.files[0]) {
        const readerInstance = new FileReader();
        readerInstance.onload = function(e) {
            SIGNUP_WIZARD_TEMPORARY_OBJECT.avatar = e.target.result;
        };
        readerInstance.readAsDataURL(fileNode.files[0]);
    }
}

function validateSignUpStepTwoDataFormCompleteness() {
    const currentType = document.getElementById("reg-account-type").value;
    const nextBtn = document.getElementById("btn-signup-step2-next");
    const personalNameInput = document.getElementById("reg-personal-name") ? document.getElementById("reg-personal-name").value.trim() : "";
    
    if(currentType === 'personal') {
        if(personalNameInput.length > 1) {
            nextBtn.disabled = false;
            nextBtn.classList.remove("faintly-colored");
        } else {
            nextBtn.disabled = true;
            nextBtn.classList.add("faintly-colored");
        }
    } else {
        const bizNameInput = document.getElementById("reg-biz-name").value.trim();
        const bizInfoInput = document.getElementById("reg-biz-info").value.trim();
        const bizDealsInput = document.getElementById("reg-biz-deals").value.trim();
        
        if(personalNameInput.length > 1 && bizNameInput.length > 1 && bizInfoInput.length > 1 && bizDealsInput.length > 1) {
            nextBtn.disabled = false;
            nextBtn.classList.remove("faintly-colored");
        } else {
            nextBtn.disabled = true;
            nextBtn.classList.add("faintly-colored");
        }
    }
}

function executeProcessSignUpStepTwoNextSequenceAction() {
    const currentType = document.getElementById("reg-account-type").value;
    SIGNUP_WIZARD_TEMPORARY_OBJECT.accountType = currentType;
    SIGNUP_WIZARD_TEMPORARY_OBJECT.identityName = document.getElementById("reg-personal-name").value.trim();
    
    if(currentType === 'business') {
        SIGNUP_WIZARD_TEMPORARY_OBJECT.businessName = document.getElementById("reg-biz-name").value.trim();
        SIGNUP_WIZARD_TEMPORARY_OBJECT.businessInfo = document.getElementById("reg-biz-info").value.trim();
        SIGNUP_WIZARD_TEMPORARY_OBJECT.productsDealtIn = document.getElementById("reg-biz-deals").value.trim();
    } else {
        SIGNUP_WIZARD_TEMPORARY_OBJECT.businessName = "";
        SIGNUP_WIZARD_TEMPORARY_OBJECT.businessInfo = "";
        SIGNUP_WIZARD_TEMPORARY_OBJECT.productsDealtIn = "";
    }
    
    renderSignUpModalWizardStepThree();
}

function renderSignUpModalWizardStepThree() {
    const wrapperTargetNode = document.getElementById("auth-modal-content");
    wrapperTargetNode.innerHTML = `
        <h3>Sign Up - Create Security Password (Step 3 of 4)</h3>
        <p style="font-size:0.8rem; color:var(--fort-gray-slate); margin-top:4px;">Must contain at least 6 characters comprising 1 uppercase literal, 1 lowercase literal, 1 numeric digit, and 1 non-alphanumeric special character symbol.</p>
        
        <div class="form-input-container margin-top-sm">
            <label>Input Desired Account Access Password Key:</label>
            <input type="password" id="reg-password-1" class="form-field-control" placeholder="Input Password">
        </div>
        <div class="form-input-container">
            <label>Re-type Password to Confirm Alignment Verification:</label>
            <input type="password" id="reg-password-2" class="form-field-control" placeholder="Confirm Password">
            <div id="err-reg-step3-validation-msg" class="text-danger-alert hidden-node"></div>
            <div class="margin-top-xs">
                <input type="checkbox" id="chk-reg-showpass" onchange="toggleFormPasswordVisibilityChainSignUp()">
                <label for="chk-reg-showpass" style="font-size:0.85rem; font-weight:400;">Show Passwords</label>
            </div>
        </div>

        <div class="btn-group margin-top-md">
            <button onclick="renderSignUpModalWizardStepTwo()" class="btn-gray">Back</button>
            <button onclick="executeValidateAndProcessSignUpStepThree()" class="btn-blue">Next</button>
        </div>
    `;
}

function toggleFormPasswordVisibilityChainSignUp() {
    const status = document.getElementById("chk-reg-showpass").checked;
    document.getElementById("reg-password-1").type = status ? "text" : "password";
    document.getElementById("reg-password-2").type = status ? "text" : "password";
}

function executeValidateAndProcessSignUpStepThree() {
    const pass1 = document.getElementById("reg-password-1").value;
    const pass2 = document.getElementById("reg-password-2").value;
    const errorNode = document.getElementById("err-reg-step3-validation-msg");
    errorNode.classList.add("hidden-node");
    
    const requirementStatementText = "Any password created should have at least one uppercase letter, one lowercase letter, one symbol, one number and should be at least six characters.";
    
    if(pass1 !== pass2) {
        errorNode.innerText = "Password mismatch configuration discovered. Verification entries must align perfectly.";
        errorNode.classList.remove("hidden-node");
        return;
    }
    
    const passesLengthTest = pass1.length >= 6;
    const passesUppercaseTest = /[A-Z]/.test(pass1);
    const passesLowercaseTest = /[a-z]/.test(pass1);
    const passesDigitTest = /[0-9]/.test(pass1);
    const passesSymbolTest = /[^A-Za-z0-9]/.test(pass1);
    
    if(!passesLengthTest || !passesUppercaseTest || !passesLowercaseTest || !passesDigitTest || !passesSymbolTest) {
        errorNode.innerText = requirementStatementText;
        errorNode.classList.remove("hidden-node");
        return;
    }
    
    SIGNUP_WIZARD_TEMPORARY_OBJECT.secretKey = pass1;
    renderSignUpModalWizardStepFour();
}

function renderSignUpModalWizardStepFour() {
    const wrapperTargetNode = document.getElementById("auth-modal-content");
    
    wrapperTargetNode.innerHTML = `
        <h3>Sign Up - Finalise Process (Step 4 of 4)</h3>
        <p style="font-size:0.92rem; color:var(--fort-blue-dark); line-height: 1.5; margin-top:12px; font-weight: 500;">
            A verification code will be sent to you by +2348028241162 or fortdevelopers492@gmail.com. This code will be used to verify your account and will be inputed when changing info, password or resetting password
        </p>
        
        <div class="btn-group margin-top-lg">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Cancel Account Creation</button>
            <button onclick="executeFinalizeAccountRegistrationPipelineSubmission()" class="btn-blue">Complete Registration</button>
        </div>
    `;
}

function executeFinalizeAccountRegistrationPipelineSubmission() {
    // Generate an internal automated distinct 4-digit token configuration unique to user records baseline context definitions
    let uniqueGeneratedTokenCode;
    let sequenceCheckIsDuplicate = true;
    
    while (sequenceCheckIsDuplicate) {
        uniqueGeneratedTokenCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        // Verify cross-records uniqueness directly against structural database models mappings
        const duplicateCodeCheck = SYSTEM_DATABASE.users.find(u => u.UserAccountAuthenticationVerificationCode === uniqueGeneratedTokenCode);
        if(!duplicateCodeCheck) {
            sequenceCheckIsDuplicate = false;
        }
    }

    const finalNewUserRecord = {
        uid: "user_" + Date.now(),
        identityName: SIGNUP_WIZARD_TEMPORARY_OBJECT.identityName,
        accountType: SIGNUP_WIZARD_TEMPORARY_OBJECT.accountType,
        country: SIGNUP_WIZARD_TEMPORARY_OBJECT.country,
        dialingCode: SIGNUP_WIZARD_TEMPORARY_OBJECT.dialingCode,
        identifierText: SIGNUP_WIZARD_TEMPORARY_OBJECT.identifierText,
        secretKey: SIGNUP_WIZARD_TEMPORARY_OBJECT.secretKey,
        avatar: SIGNUP_WIZARD_TEMPORARY_OBJECT.avatar || "", // Maps uploaded image data string dynamically if supplied
        verificationStatus: "unverified", // Mandatory default security tag layer
        UserAccountAuthenticationVerificationCode: uniqueGeneratedTokenCode, // Requested exact functional ID key target
        businessName: SIGNUP_WIZARD_TEMPORARY_OBJECT.businessName || SIGNUP_WIZARD_TEMPORARY_OBJECT.identityName,
        businessInfo: SIGNUP_WIZARD_TEMPORARY_OBJECT.businessInfo || "No descriptions detailed yet."
    };
    
    SYSTEM_DATABASE.users.push(finalNewUserRecord);
    
    const systemAdminWelcomeThreadNode = {
        chatId: "chat_admin_" + finalNewUserRecord.uid,
        dynamicParticipants: ["admin", finalNewUserRecord.uid],
        messageLog: [
            { mid: "wel1", senderUid: "admin", text: "Thanks for choosing Fort Mart. We are here with an amazing web app when it comes to online shopping. We wish you best of luck as you explore the market.", timestamp: "Just Now", status: "bold-double" }
        ]
    };
    SYSTEM_DATABASE.chats.push(systemAdminWelcomeThreadNode);
    
    syncPlatformDatabaseStateToWebStorage();
    
    APP_STATE.currentUser = finalNewUserRecord;
    closeActiveModalDirectly('auth-modal');
    
    document.getElementById("welcome-modal").classList.add("active");
    renderMarketplaceProductsDisplayLoop();
}

function renderForgotPasswordModalWorkflow() {
    const wrapperTargetNode = document.getElementById("auth-modal-content");
    wrapperTargetNode.innerHTML = `
        <h3>Reset Password - Identify Account (Step 1)</h3>
        <p style="font-size:0.85rem; margin-top:6px; color:var(--fort-gray-slate);">
            Provide your country code and registered identification details to begin the secure password recovery pipeline.
        </p>
        
        <div class="form-input-container margin-top-sm">
            <label style="font-size:0.82rem; font-weight:700; color:var(--fort-gray-slate);">Country Code:</label>
            <input type="text" id="forgot-country" class="form-field-control" placeholder="+234">
        </div>

        <div class="form-input-container margin-top-xs">
            <label style="font-size:0.82rem; font-weight:700; color:var(--fort-gray-slate);">Registration Contact (Email / Phone):</label>
            <input type="text" id="forgot-id" class="form-field-control" placeholder="example@domain.com">
        </div>

        <div class="form-input-container margin-top-xs">
            <label style="font-size:0.82rem; font-weight:700; color:var(--fort-gray-slate);">Account Signup Authentication Verification Code:</label>
            <input type="text" id="forgot-verification-code-input" class="form-field-control" placeholder="Enter your verification code">
            <div id="err-forgot-step1-feedback" class="text-danger-alert hidden-node" style="color: red; font-size: 0.8rem; margin-top: 4px;"></div>
        </div>

        <div class="btn-group margin-top-md">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Close</button>
            <button onclick="executeValidateForgotPasswordStepOnePipelineTrace()" class="btn-blue">Next</button>
        </div>
    `;
}

function executeValidateForgotPasswordStepOnePipelineTrace() {
    const code = document.getElementById("forgot-country").value.trim();
    const rawId = document.getElementById("forgot-id").value.trim();
    const inputVerificationCode = document.getElementById("forgot-verification-code-input").value.trim();
    const errorNode = document.getElementById("err-forgot-step1-feedback");
    
    errorNode.classList.add("hidden-node");
    errorNode.innerText = "";

    // 1. Find account checking dialing code and registration identifier matching context parameters
    const accountMatch = SYSTEM_DATABASE.users.find(u => 
        u.dialingCode === code && 
        u.identifierText.toLowerCase() === rawId.toLowerCase()
    );
    
    if(!accountMatch) {
        errorNode.innerText = "No structural match trace discovered checking records configuration baseline arrays.";
        errorNode.classList.remove("hidden-node");
        return;
    }
    
    // 2. Extract verification code reference fields cleanly 
    const correctVerificationCode = String(
        accountMatch.UserAccountAuthenticationVerificationCode || 
        accountMatch.verificationCode || 
        ''
    ).trim();

    // 3. Match user authentication text variable criteria directly
    if (inputVerificationCode !== correctVerificationCode) {
        errorNode.innerText = "incorrect verification code";
        errorNode.classList.remove("hidden-node");
        return;
    }
    
    // Track valid session account identity values across sequential interfaces
    SIGNUP_WIZARD_TEMPORARY_OBJECT.resetTargetUid = accountMatch.uid;
    
    // Transition straight into the New Password definition interface matrix 
    renderForgotPasswordStepTwoLayout();
}

function renderForgotPasswordStepTwoLayout() {
    const wrapperTargetNode = document.getElementById("auth-modal-content");
    wrapperTargetNode.innerHTML = `
        <h3>Reset Password - Define New Security Key (Step 2 of 2)</h3>
        <div class="form-input-container margin-top-sm">
            <label>Input New Security Access Password Token Key Pattern:</label>
            <input type="password" id="forgot-newpass-1" class="form-field-control" placeholder="New Password Expression">
        </div>
        <div class="form-input-container">
            <label>Re-type New Password Expression to Confirm Alignment:</label>
            <input type="password" id="forgot-newpass-2" class="form-field-control" placeholder="Confirm Password Expression">
            <div id="err-forgot-newpass-feedback" class="text-danger-alert hidden-node"></div>
        </div>
        <div class="btn-group">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Discard Session</button>
            <button onclick="executeCommitNewPasswordToSystemDatabase()" class="btn-blue">Save & Login</button>
        </div>
    `;
}

function executeCommitNewPasswordToSystemDatabase() {
    const p1 = document.getElementById("forgot-newpass-1").value;
    const p2 = document.getElementById("forgot-newpass-2").value;
    const errorNode = document.getElementById("err-forgot-newpass-feedback");
    errorNode.classList.add("hidden-node");
    
    if(p1 !== p2) {
        errorNode.innerText = "Password structural mismatch discovered checking confirmation fields string parameters.";
        errorNode.classList.remove("hidden-node");
        return;
    }
    
    if(p1.length < 6 || !/[A-Z]/.test(p1) || !/[a-z]/.test(p1) || !/[0-9]/.test(p1) || !/[^A-Za-z0-9]/.test(p1)) {
        errorNode.innerText = "Any password created should have at least one uppercase letter, one lowercase letter, one symbol, one number and should be at least six characters.";
        errorNode.classList.remove("hidden-node");
        return;
    }
    
    const accountIndexId = SYSTEM_DATABASE.users.findIndex(u => u.uid === SIGNUP_WIZARD_TEMPORARY_OBJECT.resetTargetUid);
    if(accountIndexId !== -1) {
        SYSTEM_DATABASE.users[accountIndexId].secretKey = p1;
        // Keep fallback synchronized if used inside admin context blocks references
        SYSTEM_DATABASE.users[accountIndexId].password = p1; 
        
        APP_STATE.currentUser = SYSTEM_DATABASE.users[accountIndexId];
        syncPlatformDatabaseStateToWebStorage();
        closeActiveModalDirectly('auth-modal');
        document.getElementById("welcome-modal").classList.add("active");
        renderMarketplaceProductsDisplayLoop();
    }
}

/**
 * Product Discovery Inventory Pipeline Management Loop & Search Filter Subsystem Engine Modules
 */
function buildCategoryRibbonFilterInterfaceElements() {
    const structuralCategoryListArray = ["Trending", "Electrical Appliances", "Mobile Devices & Computers", "Home Furniture", "Fashion Clothing Apparel", "Automotive Parts & Engines", "Others"];
    const targetsWrapperNode = document.getElementById("category-items-container");
    targetsWrapperNode.innerHTML = "";
    
    structuralCategoryListArray.forEach(catName => {
        const chipBtnNode = document.createElement("button");
        chipBtnNode.className = `category-chip-btn ${APP_STATE.currentSelectedCategory === catName ? 'active' : ''}`;
        chipBtnNode.innerText = catName;
        chipBtnNode.onclick = () => {
            document.querySelectorAll(".category-chip-btn").forEach(b => b.classList.remove("active"));
            chipBtnNode.classList.add("active");
            executeCategorizedInventoryFilterAction(catName);
        };
        targetsWrapperNode.appendChild(chipBtnNode);
    });
}

function toggleCategoryDrawer() {
    const targetNode = document.getElementById("category-items-container");
    APP_STATE.categoryDrawerOpen = !APP_STATE.categoryDrawerOpen;
    if(APP_STATE.categoryDrawerOpen) {
        targetNode.classList.remove("hidden");
    } else {
        targetNode.classList.add("hidden");
    }
}

function executeCategorizedInventoryFilterAction(categoryNameString) {
    APP_STATE.currentSelectedCategory = categoryNameString;
    const subheaderNode = document.getElementById("active-category-header");
    
    if(categoryNameString === 'Trending') {
        subheaderNode.classList.add("hidden-node");
    } else {
        subheaderNode.classList.remove("hidden-node");
        document.getElementById("category-title-text").innerText = categoryNameString;
    }
    renderMarketplaceProductsDisplayLoop();
}

function handleGlobalSearch(searchStringQuery) {
    APP_STATE.searchQuery = searchStringQuery.trim().toLowerCase();
    if(APP_STATE.activeViewPage === 'home') {
         renderMarketplaceProductsDisplayLoop();
    } else if(APP_STATE.activeViewPage === 'messages') {
         renderUserConversationsLogRoster();
    } else if(APP_STATE.activeViewPage === 'my-account') {
         executeFilteringSettingsContentPaneRowsNodesDisplay(APP_STATE.searchQuery);
    }
}

function handleCategorySearch(searchStringQuery) {
    APP_STATE.searchQuery = searchStringQuery.trim().toLowerCase();
    renderMarketplaceProductsDisplayLoop();
}

function renderMarketplaceProductsDisplayLoop() {
    const loopDisplayTargetGrid = document.getElementById("products-display-grid");
    if(!loopDisplayTargetGrid) return;
    
    loopDisplayTargetGrid.innerHTML = "";
    // Isolate active currency indicators contexts parameters mapping keys rules values sets properties
    let baselineCurrencyIndicatorSymbol = "₦";
    let locationFilteringCriteriaString = "Nigeria";
    
    if(APP_STATE.currentUser) {
        locationFilteringCriteriaString = APP_STATE.currentUser.country;
        baselineCurrencyIndicatorSymbol = (APP_STATE.currentUser.country === 'Nigeria') ? '₦' : '$';
    }
    
    // Ensure database array reference exists securely
    const leaderboard = SYSTEM_DATABASE.pinnedLeaderboard || [];
    
    // Process matching filtration datasets loop logic constraints steps tracking parameters
    let computedInventoryOutputArray = SYSTEM_DATABASE.products.filter(item => {
        const structuralOwnerAccountPointer = SYSTEM_DATABASE.users.find(u => u.uid === item.ownerUid);
        if(!structuralOwnerAccountPointer) return false;
        
        // Strict operational region context localization bounds checking matching array scopes rules properties
        if(structuralOwnerAccountPointer.country !== locationFilteringCriteriaString) 
            return false;
        
        // Match checking categorizations metrics blocks
        if(APP_STATE.currentSelectedCategory !== 'Trending' && item.category !== APP_STATE.currentSelectedCategory) return false;
        
        // Match checking search string criteria queries profiles keys
        if(APP_STATE.searchQuery !== '') {
            const matchTitleFlag = item.name.toLowerCase().includes(APP_STATE.searchQuery);
            const matchInfoFlag = item.info.toLowerCase().includes(APP_STATE.searchQuery);
            if(!matchTitleFlag && !matchInfoFlag) return false;
        }
        
        return true;
    });

    // Extract products currently assigned to active slots in the leaderboard
    let pinnedItems = computedInventoryOutputArray.filter(item => leaderboard.includes(item.pid));
    
    // Extract normal items not registered on the leaderboard
    let normalItems = computedInventoryOutputArray.filter(item => !leaderboard.includes(item.pid));

    // Sort strategy: Pinned products are ordered matching their leaderboard indices sequence
    pinnedItems.sort((first, second) => leaderboard.indexOf(first.pid) - leaderboard.indexOf(second.pid));
    
    // Fallback: normal items sort down dynamically by expanded view counts
    normalItems.sort((first, second) => (second.clickCount || 0) - (first.clickCount || 0));

    // Combine array paths back with pinned elements in primary slots
    let combinedFilteredOutput = [...pinnedItems, ...normalItems];
    
    // Fallback external execution pipeline intercept arrays if matches count is lower than baseline limit constraints 
    let displayArrayToProcess = [...combinedFilteredOutput];
    if(displayArrayToProcess.length < 20) {
        // Build simulated external structural product feed mock items to backfill up to index threshold constraints
        let backfillDeficitCount = 20 - displayArrayToProcess.length;
        const structuralExternalAffiliateSourcesNamesArray = ["Jumia Hub Feed", "Temu Global Logistic Feed", "Jiji Local Ad Scraping Matrix", "Konga Digital Marketplace Warehouse"];
        for(let idx = 0; idx < backfillDeficitCount; idx++) {
            let sourcePointerString = structuralExternalAffiliateSourcesNamesArray[idx % structuralExternalAffiliateSourcesNamesArray.length];
            displayArrayToProcess.push({
                pid: `ext_mock_${idx}`,
                ownerUid: "admin",
                name: `[Affiliate External Entity - ${sourcePointerString}] Standard Retail Inventory Match Log Block Unit #${1042 + idx}`,
                category: APP_STATE.currentSelectedCategory,
                info: "Synchronized fallback inventory data stream pulled from global merchant network endpoints channels tracking configurations metrics models.",
                price: parseFloat(2250 * (idx + 3)),
                coverPhoto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e0'><path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z'/></svg>",
                aiInfo: "External cross-network catalog matrix item profile baseline validation data structure trace.",
                clickCount: 12,
                isExternalAffiliateNodeFlag: true
            });
        }
    }
    
    // Render computed final layout processing stream loop context grid items rows
    displayArrayToProcess.forEach((product, pointerIndexId) => {
        // Evaluate framework positioning markers to execute dynamic Google AdSense interstitial layouts mock placeholders
        
        const contextualOwnerRecord = SYSTEM_DATABASE.users.find(u => u.uid === product.ownerUid);
        const ownerCorporateEntityLabel = contextualOwnerRecord ? contextualOwnerRecord.businessName : "External Distribution Global Network Services Partner Hub";
        const ownerCircularAvatarSrcString = (contextualOwnerRecord && contextualOwnerRecord.avatar) ? contextualOwnerRecord.avatar : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23718096'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/></svg>";
        const cardContainerBlockElement = document.createElement("div");
        cardContainerBlockElement.className = "product-item-card-container rounded-rect";
        
        // Pinned badge evaluation using leaderboard records arrays tracking indicators
        const isProductPinned = leaderboard.includes(product.pid);
        const pinnedBadgeHTML = isProductPinned ?
            `<span style="background:var(--fort-blue-light); color:white; padding:2px 8px; font-size:0.7rem; border-radius:4px; font-weight:bold; margin-left:auto;">📌</span>` : '';
            
        cardContainerBlockElement.innerHTML = `
            <div class="poster-profile-strip" onclick="event.stopPropagation(); launchDetailedUserProfileContextOverlaySummaryModal('${product.ownerUid}')">
                <img class="mini-profile-avatar circle-container" src="${ownerCircularAvatarSrcString}" alt="Avatar">
                <span class="mini-profile-business-name">${ownerCorporateEntityLabel}</span>
                ${pinnedBadgeHTML}
            </div>
            <div class="product-card-image-box" onclick="launchComprehensiveProductSpecificationsExpandedModalView('${product.pid}')">
                <img src="${product.coverPhoto}" alt="Inventory Core Component Render">
            </div>
            <div class="product-card-details-block" onclick="launchComprehensiveProductSpecificationsExpandedModalView('${product.pid}')">
                <h4 class="product-card-title">${product.name}</h4>
                <p class="product-card-description">${product.info.substring(0, 100)}</p>
                <div class="product-card-price-tag">${baselineCurrencyIndicatorSymbol}${product.price.toLocaleString()}</div>
                <div class="btn-group" style="margin-top:auto;">
                    ${product.isExternalAffiliateNodeFlag ?
                        `<button class="btn-gray" style="width:100%; font-size:0.8rem;" onclick="event.stopPropagation(); alert('Redirecting external processing pipelines traces safely to affiliate endpoints portals.')">Visit Merchant Channel Portal</button>` :
                        `<button class="btn-blue" style="width:100%; font-size:0.8rem;"
                        onclick="event.stopPropagation(); initialDirectMessageCommunicationPipelineSetup('${product.ownerUid}')">Message Seller</button>`
                    }
                </div>
            </div>
        `;
        loopDisplayTargetGrid.appendChild(cardContainerBlockElement);
    });
}

function launchComprehensiveProductSpecificationsExpandedModalView(productIdTokenKey) {
    if(!APP_STATE.currentUser) {
        triggerAuthenticationModalSequence();
        return;
    }
    
    let targetedProductItemMatch = SYSTEM_DATABASE.products.find(p => p.pid === productIdTokenKey);
    if(!targetedProductItemMatch) {
        targetedProductItemMatch = {
            pid: productIdTokenKey, ownerUid: "admin", name: "Synchronized Affiliate System Feed Record", category: "General Ledger", info: "Fallback inventory trace mapping record placeholder data structural component metrics analysis logs references.", price: 12500, coverPhoto: "", aiInfo: "External baseline mapping tracking references model arrays values.", clickCount: 1
        };
    }
    
    targetedProductItemMatch.clickCount = (targetedProductItemMatch.clickCount || 0) + 1;
    const operationalTargetProfileOwnerRecord = SYSTEM_DATABASE.users.find(u => u.uid === targetedProductItemMatch.ownerUid);
    const detailOverlayBodyNode = document.getElementById("product-detail-modal-body");
    let baselineCurrencySymbolSign = (APP_STATE.currentUser && APP_STATE.currentUser.country === 'Nigeria') ? '₦' : '$';
    
    let operationalActionControlsLayoutStringHTML = "";
    if(APP_STATE.currentUser && APP_STATE.currentUser.uid === targetedProductItemMatch.ownerUid) {
        operationalActionControlsLayoutStringHTML = `
            <button class="btn-gray" onclick="closeActiveModalDirectly('product-detail-modal'); switchSettingsSection('my-products'); navigateToPage('my-account');">⚙️ Manage Details & Inventory Post Structure</button>
        `;
    } else {
        operationalActionControlsLayoutStringHTML = `
            <button class="btn-blue" onclick="closeActiveModalDirectly('product-detail-modal'); initialDirectMessageCommunicationPipelineSetup('${targetedProductItemMatch.ownerUid}')">💬 Message Seller</button>
        `;
    }

    // --- INTEGRATION: ADMIN PIN CONTROLS SUB-SYSTEM ---
    let adminPinControlHTML = "";
    const isUserAdmin = (APP_STATE.currentUser.uid === 'admin' || APP_STATE.currentUser.id === 'admin');
    
    if (isUserAdmin) {
        const leaderboard = SYSTEM_DATABASE.pinnedLeaderboard || [];
        const isCurrentPinned = leaderboard.includes(targetedProductItemMatch.pid);
        
        adminPinControlHTML = `
            <div style="background: #edf2f7; border: 1px dashed var(--fort-blue-primary); padding: 12px; border-radius: 6px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span style="font-size: 0.85rem; font-weight: bold; color: var(--fort-blue-dark);">🛡️ Admin Controls: Listing Pin Option</span>
                    <button class="${isCurrentPinned ? 'btn-gray' : 'btn-blue'}" style="padding: 6px 12px; font-size: 0.8rem; font-weight: bold;"
                        onclick="executeToggleProductPinState('${targetedProductItemMatch.pid}')">
                        ${isCurrentPinned ? '🛑 Unpin Listing' : '📌 Pin to Top'}
                    </button>
                </div>
                <button class="btn-blue" style="width: 100%; padding: 6px; font-size: 0.8rem; font-weight: bold; margin-top: 4px;" 
                    onclick="launchPinnedProductsLeaderboardModal()">
                    🏆 Open Pinned Products Leaderboard
                </button>
            </div>
        `;
    }
    
    const productDisplayImage = targetedProductItemMatch.coverPhoto ||
        `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e0'><path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/></svg>`;
        
    detailOverlayBodyNode.innerHTML = `
        <div class="modal-expanded-header-row" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--fort-gray-border); padding-bottom:14px;">
            <h3>Product Specification Comprehensive Expanded Data Context View</h3>
            <button onclick="closeActiveModalDirectly('product-detail-modal')" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">✕</button>
        </div>
        <div class="modal-expanded-content-split-grid margin-top-md" style="display:grid; grid-template-columns: 1fr 1fr; gap:24px;">
            <div class="expanded-left-visuals-column">
               <div class="expanded-master-image-box rounded-rect" style="width:100%; height:320px; background-color:#fcfcfc; overflow:hidden; border:1px solid var(--fort-gray-border); display:flex; align-items:center; justify-content:center;">
                    <img src="${productDisplayImage}" style="width:100%; height:100%; object-fit:contain;" alt="Master Expanded Product Frame">
                </div>
            </div>
            <div class="expanded-right-details-column" style="display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${(operationalTargetProfileOwnerRecord && operationalTargetProfileOwnerRecord.avatar) ? operationalTargetProfileOwnerRecord.avatar : 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23a0aec0\'><path d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z\'/></svg>'}" style="width:44px; height:44px;" class="circle-container" alt="Vendor Big Profile Photo">
                    <div>
                        <h4 style="color:var(--fort-blue-primary);">${operationalTargetProfileOwnerRecord ? operationalTargetProfileOwnerRecord.businessName : 'External Distribution Entity Framework Node Line'}</h4>
                        <span style="font-size:0.75rem; color:var(--fort-gray-slate);">Inventory Verification Origin Region Node Log: ${operationalTargetProfileOwnerRecord ? operationalTargetProfileOwnerRecord.country : 'Global Matrix Platform Partner Network'}</span>
                    </div>
                </div>
                
                <h2 style="color:var(--fort-blue-dark); font-weight:800; margin-top:8px;">${targetedProductItemMatch.name}</h2>
                <div style="font-size:1.6rem; font-weight:900; color:var(--fort-blue-light);">${baselineCurrencySymbolSign}${targetedProductItemMatch.price.toLocaleString()}</div>
                
                <div class="spec-note-paragraph-block">
                    <h5 style="text-transform:uppercase; font-size:0.75rem; letter-spacing:1px; color:var(--fort-gray-slate);">Primary Descriptive Summary Logs</h5>
                    <p style="font-size:0.95rem; line-height:1.4; color:var(--fort-blue-dark); margin-top:4px;">${targetedProductItemMatch.info}</p>
                </div>

                <div class="spec-note-paragraph-block">
                    <h5 style="text-transform:uppercase; font-size:0.75rem; letter-spacing:1px; color:var(--fort-gray-slate);">More Info and Specifications</h5>
                    <p style="font-size:0.9rem; line-height:1.4; font-style:italic; color:var(--fort-blue-primary); margin-top:4px;">${targetedProductItemMatch.aiInfo || 'No foundational metadata parameters declared for cognitive tracking processing arrays models.'}</p>
                </div>
                
                ${adminPinControlHTML}

                <div class="modal-expanded-actions-footer-row btn-group" style="margin-top:auto; padding-top:16px; border-top:1px solid #f0f0f0;">
                    ${operationalActionControlsLayoutStringHTML}
                </div>
            </div>
        </div>
    `;
    document.getElementById("product-detail-modal").classList.add("active");
}

/**
 * Action execution function modifying pin placement parameter assignments fields on target listings 
 */
function executeToggleProductPinState(productIdKey) {
    if (!SYSTEM_DATABASE.pinnedLeaderboard) {
        SYSTEM_DATABASE.pinnedLeaderboard = [];
    }
    
    const indexLocation = SYSTEM_DATABASE.pinnedLeaderboard.indexOf(productIdKey);
    
    if (indexLocation > -1) {
        // Product is pinned: unpin it by removing it from leaderboard
        SYSTEM_DATABASE.pinnedLeaderboard.splice(indexLocation, 1);
    } else {
        // Product is not pinned: append it to leaderboard if slots are available
        if (SYSTEM_DATABASE.pinnedLeaderboard.length >= 20) {
            alert("Administrative Action Blocked: The leaderboard has hit its maximum limit of 20 slots.");
            return;
        }
        SYSTEM_DATABASE.pinnedLeaderboard.push(productIdKey);
    }

    // Sync modifications down into data storage layer configurations
    administrativeSaveAndRefreshDisplay(productIdKey);
}

/**
 * Instantiates or ensures structural existence of leaderboard modal window frames
 */
function ensureLeaderboardModalHTMLExists() {
    if (document.getElementById("pinned-leaderboard-modal")) return;

    const modalWrapperNode = document.createElement("div");
    modalWrapperNode.id = "pinned-leaderboard-modal";
    modalWrapperNode.className = "universal-modal-container-wrapper"; // Assumes your style layout uses an '.active' class
    modalWrapperNode.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); display: none; align-items: center;
        justify-content: center; z-index: 10000; padding: 20px;
    `;

    modalWrapperNode.innerHTML = `
        <div style="background: white; width: 100%; max-width: 550px; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; max-height: 85vh;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
                <h3 style="margin: 0; color: var(--fort-blue-dark);">🏆 Pinned Products Leaderboard (20 Slots)</h3>
                <button onclick="closeActiveModalDirectly('pinned-leaderboard-modal')" style="background: none; border: none; font-size: 1.3rem; cursor: pointer;">✕</button>
            </div>
            <div id="leaderboard-slots-container" style="overflow-y: auto; margin-top: 15px; flex: 1; display: flex; flex-direction: column; gap: 8px; padding-right: 4px;">
                </div>
        </div>
    `;
    document.body.appendChild(modalWrapperNode);
}

// Global active element index state pointer tracking variables
let trackingActiveSelectedLeaderboardPid = null;

/**
 * Renders list items mapping loop records indices details inside the leaderboard view
 */
function launchPinnedProductsLeaderboardModal() {
    ensureLeaderboardModalHTMLExists();
    
    const container = document.getElementById("leaderboard-slots-container");
    container.innerHTML = "";
    
    const leaderboard = SYSTEM_DATABASE.pinnedLeaderboard || [];
    
    if (leaderboard.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #718096; font-size: 0.9rem; margin: 20px 0;">No items are currently pinned to the leaderboard.</p>`;
    } else {
        leaderboard.forEach((pid, index) => {
            const product = SYSTEM_DATABASE.products.find(p => p.pid === pid);
            const isSelected = (trackingActiveSelectedLeaderboardPid === pid);
            
            const slotRowElement = document.createElement("div");
            slotRowElement.style.cssText = `
                border: 1px solid ${isSelected ? 'var(--fort-blue-primary)' : '#e2e8f0'};
                border-radius: 6px; padding: 10px; background: ${isSelected ? '#f7fafc' : 'white'};
                cursor: pointer; display: flex; flex-direction: column; gap: 8px;
            `;
            slotRowElement.onclick = () => {
                trackingActiveSelectedLeaderboardPid = isSelected ? null : pid;
                launchPinnedProductsLeaderboardModal();
            };
            
            // Handle missing fallback traces securely
            const titleText = product ? product.name : `[Unknown/Deleted Product ID: ${pid}]`;
            const clickCountInfo = product ? `(${product.clickCount || 0} views)` : '';
            
            let actionButtonsBarHTML = "";
            if (isSelected) {
                actionButtonsBarHTML = `
                    <div style="display: flex; gap: 6px; margin-top: 4px;" onclick="event.stopPropagation();">
                        <button class="btn-blue" style="flex: 1; padding: 4px; font-size: 0.75rem; font-weight: bold;" onclick="shiftLeaderboardRankPosition('${pid}', -1)">▲ Move Up</button>
                        <button class="btn-blue" style="flex: 1; padding: 4px; font-size: 0.75rem; font-weight: bold;" onclick="shiftLeaderboardRankPosition('${pid}', 1)">▼ Move Down</button>
                        <button class="btn-gray" style="flex: 1; padding: 4px; font-size: 0.75rem; font-weight: bold; background: #fed7d7; color: #c53030; border: 1px solid #feb2b2;" onclick="removeLeaderboardItemDirectly('${pid}')">🗑️ Remove</button>
                    </div>
                `;
            }
            
            slotRowElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.88rem;">
                    <div style="font-weight: bold; color: var(--fort-blue-light); display: flex; gap: 8px;">
                        <span>#${index + 1}</span>
                        <span style="color: #2d3748; font-weight: 500; max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${titleText}</span>
                    </div>
                    <span style="font-size: 0.75rem; color: #a0aec0;">${clickCountInfo}</span>
                </div>
                ${actionButtonsBarHTML}
            `;
            container.appendChild(slotRowElement);
        });
    }
    
    document.getElementById("pinned-leaderboard-modal").style.display = "flex";
}

/**
 * Changes rank index ordering position up or down inside leaderboard tracking fields arrays
 */
function shiftLeaderboardRankPosition(pid, directionalDeltaIndex) {
    const leaderboard = SYSTEM_DATABASE.pinnedLeaderboard || [];
    const targetIndex = leaderboard.indexOf(pid);
    
    if (targetIndex === -1) return;
    
    const computedNewPositionIndex = targetIndex + directionalDeltaIndex;
    
    // Bounds limit checks
    if (computedNewPositionIndex < 0 || computedNewPositionIndex >= leaderboard.length) return;
    
    // Swap array position keys elements
    let temporaryHolderPlaceholder = leaderboard[targetIndex];
    leaderboard[targetIndex] = leaderboard[computedNewPositionIndex];
    leaderboard[computedNewPositionIndex] = temporaryHolderPlaceholder;
    
    // Sync adjustments down across databases
    administrativeSaveAndRefreshDisplay();
    launchPinnedProductsLeaderboardModal();
}

/**
 * Removes a product code identifier sequence directly from pinned rankings arrays
 */
function removeLeaderboardItemDirectly(pid) {
    const leaderboard = SYSTEM_DATABASE.pinnedLeaderboard || [];
    const index = leaderboard.indexOf(pid);
    
    if (index > -1) {
        leaderboard.splice(index, 1);
        if (trackingActiveSelectedLeaderboardPid === pid) {
            trackingActiveSelectedLeaderboardPid = null;
        }
        
        administrativeSaveAndRefreshDisplay(pid);
        launchPinnedProductsLeaderboardModal();
    }
}

/**
 * Overrides modal dismissal tracking utility hooks seamlessly
 */
const baselineCloseActiveModalDirectly = window.closeActiveModalDirectly;
window.closeActiveModalDirectly = function(modalIdString) {
    if (modalIdString === 'pinned-leaderboard-modal') {
        const modal = document.getElementById("pinned-leaderboard-modal");
        if (modal) modal.style.display = "none";
        return;
    }
    
    if (typeof baselineCloseActiveModalDirectly === "function") {
        baselineCloseActiveModalDirectly(modalIdString);
    } else {
        const structuralModalNode = document.getElementById(modalIdString);
        if (structuralModalNode) structuralModalNode.classList.remove("active");
    }
};

/**
 * Messenger Communications Infrastructure Core System Engine Processing Architecture Module
 */
function renderUserConversationsLogRoster() {
    const logContainerTargetNode = document.getElementById("chat-threads-target-list");
    if(!logContainerTargetNode) return;
    
    logContainerTargetNode.innerHTML = "";
    
    if(!APP_STATE.currentUser) return;
    
    // --- FEATURE: SPECIAL ADMIN BROADCAST CHANNEL CONTROLS ---
    if (APP_STATE.currentUser.uid === 'admin') {
        // Render All Personal Accounts Node Channel
        const personalBroadcastNode = document.createElement("div");
        personalBroadcastNode.className = `chat-thread-roster-row broadcast-system-node ${APP_STATE.activeChatTargetUserHash === 'broadcast_personal' ? 'active' : ''}`;
        personalBroadcastNode.onclick = () => activateMessengerConversationWorkspaceSessionBlock('broadcast_personal');
        personalBroadcastNode.innerHTML = `
            <div class="circle-container" style="width:38px; height:38px; background-color:#3182ce; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; font-size:1.1rem;">📢</div>
            <div style="flex:1; overflow:hidden;">
                <h5 style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#2b6cb0; font-weight:800;">[ALL PERSONAL ACCOUNTS]</h5>
                <p style="font-size:0.78rem; color:var(--fort-gray-slate); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;">System Broadcast Console Terminal</p>
            </div>
        `;
        logContainerTargetNode.appendChild(personalBroadcastNode);

        // Render All Business Accounts Node Channel
        const businessBroadcastNode = document.createElement("div");
        businessBroadcastNode.className = `chat-thread-roster-row broadcast-system-node ${APP_STATE.activeChatTargetUserHash === 'broadcast_business' ? 'active' : ''}`;
        businessBroadcastNode.onclick = () => activateMessengerConversationWorkspaceSessionBlock('broadcast_business');
        businessBroadcastNode.innerHTML = `
            <div class="circle-container" style="width:38px; height:38px; background-color:#319795; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; font-size:1.1rem;">📢</div>
            <div style="flex:1; overflow:hidden;">
                <h5 style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#234e52; font-weight:800;">[ALL BUSINESS ACCOUNTS]</h5>
                <p style="font-size:0.78rem; color:var(--fort-gray-slate); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;">System Broadcast Console Terminal</p>
            </div>
        `;
        logContainerTargetNode.appendChild(businessBroadcastNode);
    }
    
    // Track matching historical stream records blocks inside systems execution memory databases maps sets
    const computedMatchingDialoguesArray = SYSTEM_DATABASE.chats.filter(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid));
    // --- FEATURE: RECENCY SORTING METHOD ---
    computedMatchingDialoguesArray.sort((a, b) => {
        const getLatestMessageTimeToken = (threadInstance) => {
            if (!threadInstance.messageLog || threadInstance.messageLog.length === 0) return 0;
            const lastMsg = threadInstance.messageLog[threadInstance.messageLog.length - 1];
            const numericExtractionMatch = lastMsg.mid.match(/\d+/);
            return numericExtractionMatch ? parseInt(numericExtractionMatch[0], 10) : 0;
        };
        return getLatestMessageTimeToken(b) - getLatestMessageTimeToken(a);
    });

    if(computedMatchingDialoguesArray.length === 0 && APP_STATE.currentUser.uid !== 'admin') {
        logContainerTargetNode.innerHTML = `<div class="text-center" style="padding:20px; color:var(--fort-gray-slate); font-size:0.85rem;"><p>No active history logs tracking conversation threads instances detected within specified regional parameters profile databases.</p></div>`;
        return;
    }
    
    computedMatchingDialoguesArray.forEach(thread => {
        const opposingParticipantUid = thread.dynamicParticipants.find(id => id !== APP_STATE.currentUser.uid);
        const opposingAccountRecord = SYSTEM_DATABASE.users.find(u => u.uid === opposingParticipantUid);
        
        if(!opposingAccountRecord) return;
        
        // Compute dynamic bracket strings layout suffixes explicitly matching business rule formulas
        let structuralLabelDisplayExpressionString = "";
    
        if(opposingAccountRecord.accountType === 'personal') {
            structuralLabelDisplayExpressionString = `${opposingAccountRecord.identityName} (Personal)`;
        } else {
            structuralLabelDisplayExpressionString = `${opposingAccountRecord.businessName} (Business) – ${opposingAccountRecord.identityName}`;
        }
        
        // Support and intercept operational filtering requests queries maps parameters directly via global navbar controllers
        if(APP_STATE.searchQuery !== '') {
            if(!structuralLabelDisplayExpressionString.toLowerCase().includes(APP_STATE.searchQuery)) return;
        }
        
        const lastMessageLogEntry = thread.messageLog[thread.messageLog.length - 1];
        let previewTextLineString = "Click thread node to initiate workspace session.";
        if (lastMessageLogEntry) {
            if (lastMessageLogEntry.isFile) {
                if (lastMessageLogEntry.isImage) previewTextLineString = `📷 [Image] ${lastMessageLogEntry.text}`;
                else if (lastMessageLogEntry.isVideo) previewTextLineString = `🎥 [Video] ${lastMessageLogEntry.text}`;
                else previewTextLineString = `📁 [File] ${lastMessageLogEntry.text}`;
            } else {
                previewTextLineString = lastMessageLogEntry.text.substring(0, 35);
            }
        }
        
        const rowWrapperNodeElement = document.createElement("div");
        rowWrapperNodeElement.className = `chat-thread-roster-row ${APP_STATE.activeChatTargetUserHash === opposingParticipantUid ? 'active' : ''}`;
        rowWrapperNodeElement.onclick = () => activateMessengerConversationWorkspaceSessionBlock(opposingParticipantUid);
        rowWrapperNodeElement.innerHTML = `
            <img src="${opposingAccountRecord.avatar || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23718096\'><path d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z\'/></svg>'}" class="mini-profile-avatar circle-container" style="width:38px; height:38px;" alt="Avatar">
            <div style="flex:1; overflow:hidden;">
                <h5 style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--fort-blue-dark); font-weight:700;">${structuralLabelDisplayExpressionString}</h5>
                <p style="font-size:0.78rem; color:var(--fort-gray-slate); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;">${previewTextLineString}</p>
            </div>
        `;
        logContainerTargetNode.appendChild(rowWrapperNodeElement);
    });
}

function initialDirectMessageCommunicationPipelineSetup(targetVendorOwnerUidTokenKey) {
    if(!APP_STATE.currentUser) {
        triggerAuthenticationModalSequence();
        return;
    }
    if(APP_STATE.currentUser.uid === targetVendorOwnerUidTokenKey) {
        alert("System Architecture Constraint Notice: Disallowed executing messenger loop initialization pipelines pointing to tracking origin logged profile instance identifiers values.");
        return;
    }
    
    const structuralTargetComboKeyArray = [APP_STATE.currentUser.uid, targetVendorOwnerUidTokenKey];
    let ongoingThreadMatchRecord = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(targetVendorOwnerUidTokenKey));
    
    if(!ongoingThreadMatchRecord) {
        ongoingThreadMatchRecord = {
            chatId: `chat_${APP_STATE.currentUser.uid}_${targetVendorOwnerUidTokenKey}`,
            dynamicParticipants: structuralTargetComboKeyArray,
            messageLog: []
        };
        SYSTEM_DATABASE.chats.push(ongoingThreadMatchRecord);
        syncPlatformDatabaseStateToWebStorage();
    }
    
    APP_STATE.activeChatTargetUserHash = targetVendorOwnerUidTokenKey;
    navigateToPage('messages');
    activateMessengerConversationWorkspaceSessionBlock(targetVendorOwnerUidTokenKey);
}

function activateMessengerConversationWorkspaceSessionBlock(targetCounterpartyUidValue) {
    APP_STATE.activeChatTargetUserHash = targetCounterpartyUidValue;
    
    document.getElementById("chat-pane-empty-notice").classList.add("hidden-node");
    const activeWorkspaceBlockNode = document.getElementById("chat-pane-active-view");
    activeWorkspaceBlockNode.classList.remove("hidden-node");
    if(APP_STATE.deviceMode === 'phone') {
         document.getElementById("chat-conversation-pane").classList.add("phone-active-thread");
    }
    
    const targetToolbarNodeElement = document.getElementById("chat-window-top-toolbar");
    if (targetCounterpartyUidValue === 'broadcast_personal' || targetCounterpartyUidValue === 'broadcast_business') {
        const headlineLabel = targetCounterpartyUidValue === 'broadcast_personal' ? 'Broadcast to All Personal Accounts' : 'Broadcast to All Business Accounts';
        targetToolbarNodeElement.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; width:100%; justify-content:space-between; background-color: #2c5282; color:var(--fort-white-pure); padding:8px 14px;" class="rounded-rect">
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-weight:700; font-size:0.95rem;">📢 ${headlineLabel}</span>
                </div>
            </div>
        `;
    } else {
        const counterpartyUserRecord = SYSTEM_DATABASE.users.find(u => u.uid === targetCounterpartyUidValue);
        targetToolbarNodeElement.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; width:100%; justify-content:space-between; background-color: var(--fort-blue-primary); color:var(--fort-white-pure); padding:8px 14px;" class="rounded-rect">
                <div style="display:flex; align-items:center; gap:10px; cursor:pointer;" onclick="launchDetailedUserProfileContextOverlaySummaryModal('${targetCounterpartyUidValue}')">
                    ${APP_STATE.deviceMode === 'phone' ? `<button onclick="event.stopPropagation(); closePhoneConversationOverlayViewBlock()" style="background:none; border:none; color:#fff; font-size:1.1rem; margin-right:4px;">←</button>` : ''}
                    <img src="${counterpartyUserRecord.avatar || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23ffffff\'><path d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z\'/></svg>'}" style="width:32px; height:32px;" class="circle-container" alt="User Avatar Image Context">
                    <span style="font-weight:600; font-size:0.9rem;">${counterpartyUserRecord.identityName}</span>
                </div>
                <div class="toolbar-buttons-sets" style="display:flex; gap:8px;">
                    <button class="btn-danger" style="padding:4px 10px; font-size:0.75rem;" onclick="executeWipeEntireDialogueLogsHistoryContextChain()">Clear Chat</button>
                </div>
            </div>
        `;
    }
    
    refreshMessengerActiveStreamBubblesDisplayList();
}

function closePhoneConversationOverlayViewBlock() {
    document.getElementById("chat-conversation-pane").classList.remove("phone-active-thread");
    APP_STATE.activeChatTargetUserHash = null;
    renderUserConversationsLogRoster();
}

function refreshMessengerActiveStreamBubblesDisplayList() {
    const streamTargetBoxNode = document.getElementById("chat-bubble-stream-area");
    if(!streamTargetBoxNode) return;
    
    streamTargetBoxNode.innerHTML = "";
    
    if(!APP_STATE.activeChatTargetUserHash || !APP_STATE.currentUser) return;
    
    if (APP_STATE.activeChatTargetUserHash === 'broadcast_personal' || APP_STATE.activeChatTargetUserHash === 'broadcast_business') {
        streamTargetBoxNode.innerHTML = `<div class='empty-placeholder' style='align-self:center; margin:auto;'><p style='color:#2b6cb0; font-size:0.88rem; font-weight:600;'>System Broadcast Terminal Mode Active.<br><span style='font-weight:400; color:var(--fort-gray-slate); font-size:0.8rem;'>Messages pushed through this form pipeline will automatically populate all designated account communication channels.</span></p></div>`;
        return;
    }
    
    const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
    if(!operationalThreadRecordData || operationalThreadRecordData.messageLog.length === 0) {
        streamTargetBoxNode.innerHTML = `<div class='empty-placeholder' style='align-self:center; margin:auto;'><p style='color:var(--fort-gray-slate); font-size:0.85rem;'>Dialogue stream initialized. Type message lines below to execute securely transmitted communication.</p></div>`;
        return;
    }
    
    operationalThreadRecordData.messageLog.forEach(msg => {
        if (msg.deletedBy && msg.deletedBy.includes(APP_STATE.currentUser.uid)) return;

        const outboundFlagCondition = msg.senderUid === APP_STATE.currentUser.uid;
        const bubbleWrapperElementNode = document.createElement("div");
        bubbleWrapperElementNode.className = `chat-bubble-node rounded-rect ${outboundFlagCondition ? 'outgoing-msg' : 'incoming-msg'}`;
        
        let dynamicTicksLayoutHTML = "";
        if(outboundFlagCondition) {
            if(msg.status === 'bold-double') {
                dynamicTicksLayoutHTML = `<span class="tick-mark-node seen">✓✓</span>`;
            } else if(msg.status === 'double') {
                dynamicTicksLayoutHTML = `<span class="tick-mark-node">✓✓</span>`;
            } else {
                dynamicTicksLayoutHTML = `<span class="tick-mark-node">✓</span>`;
            }
        }
        
        let bodyLayoutHTML = "";
        let downloadControlHTML = "";
        
        if (msg.isFile) {
            if (msg.isImage) {
                bodyLayoutHTML = `
                    <div style="display: block;">
                        <img src="${msg.fileData}" class="msg-image-preview" style="max-width: 200px; max-height: 200px; border-radius: 6px; display: block; margin-bottom: 4px;" alt="Image File Payload">
                        <p style="word-break:break-word; font-size:0.78rem; color:inherit; opacity:0.85; margin:0; display:flex; align-items:center; gap:4px;">🖼️ ${msg.text}</p>
                    </div>
                `;
            } else if (msg.isVideo) {
                // Video preview uses a standard HTML5 video block displaying a single locked timeline clip layout.
                // The controls attribute is stripped and a pointer-events overlay prevents playback without manual download hook triggers.
                bodyLayoutHTML = `
                    <div style="display: block; position: relative; max-width: 240px; border-radius: 6px; overflow: hidden; background: #000; margin-bottom: 4px;">
                        <video src="${msg.fileData}" style="width: 100%; height: auto; display: block; pointer-events: none;" preload="metadata"></video>
                        <div style="position: absolute; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.35);">
                            <span style="font-size: 2rem; color: #fff; opacity: 0.85;">▶</span>
                        </div>
                    </div>
                    <p style="word-break:break-word; font-size:0.78rem; color:inherit; opacity:0.85; margin:0; display:flex; align-items:center; gap:4px;">🎥 ${msg.text}</p>
                `;
            } else {
                // Documents layout file type resolution mapping engine matching criteria parameters rules
                let documentBadgeSVGHTML = "";
                const absoluteFileExtensionToken = msg.text.split('.').pop().toLowerCase();
                
                if (absoluteFileExtensionToken === 'pdf') {
                    documentBadgeSVGHTML = `
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:2px;">
                            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM11.5 9.5C11.5 10.33 10.83 11 10 11H8.5V12.5H7V7H10C10.83 7 11.5 7.67 11.5 8.5V9.5ZM17 8.5C17 9.88 15.88 11 14.5 11H13V7H14.5C15.88 7 17 8.12 17 8.5ZM21 15H19.5V14H21V12.5H19.5V11.5H21V10H18V16H21V15Z" fill="#E53E3E"/>
                            <path d="M8.5 8.5H10V9.5H8.5V8.5ZM14.5 8.5H15.5V9.5H14.5V8.5Z" fill="#E53E3E"/>
                        </svg>`;
                } else if (absoluteFileExtensionToken === 'txt') {
                    documentBadgeSVGHTML = `
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:2px;">
                            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="#4A5568"/>
                        </svg>`;
                } else {
                    documentBadgeSVGHTML = `
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:2px;">
                            <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM12 18C9.79 18 8 16.21 8 14C8 11.79 9.79 10 12 10C14.21 10 16 11.79 16 14C16 16.21 14.21 18 12 18Z" fill="#3182CE"/>
                        </svg>`;
                }
                
                bodyLayoutHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.05); padding: 10px; border-radius: 6px; min-width: 120px;">
                        ${documentBadgeSVGHTML}
                        <p style="word-break:break-word; font-weight:600; font-size:0.82rem; margin:4px 0 0 0; text-align:center;">${msg.text}</p>
                    </div>
                `;
            }
            downloadControlHTML = `<button class="msg-action-btn" onclick="executeMessageFileDownloadTracker('${msg.mid}')">📥 Download</button>`;
        } else {
            bodyLayoutHTML = `<p style="word-break:break-word;">${msg.text}</p>`;
        }
        
        // --- FEATURE: DELETE FOR ALL VISIBILITY CHECK ---
        let deleteForAllControlHTML = "";
        if (outboundFlagCondition) {
            deleteForAllControlHTML = `<button class="msg-action-btn" style="color:#c53030; font-weight:700;" onclick="executeSelectedBubbleMessagePurgeForAll('${msg.mid}')">💥 Delete for All</button>`;
        }
        
        bubbleWrapperElementNode.innerHTML = `
            ${bodyLayoutHTML}
            <div class="msg-meta-row">
                <span>${msg.timestamp}</span> 
                <span>${msg.Date || ''}</span>
                ${dynamicTicksLayoutHTML}
            </div>
            <div class="msg-hover-actions">
                <button class="msg-action-btn" onclick="executeMessageTextCopyClipboard('${msg.mid}')">📋 Copy</button>
                ${downloadControlHTML}
                <button class="msg-action-btn" style="color:#9b2c2c;" onclick="executeSelectedBubbleMessagePurge('${msg.mid}')">🗑️ Delete</button>
                ${deleteForAllControlHTML}
            </div>
        `;
        streamTargetBoxNode.appendChild(bubbleWrapperElementNode);
    });
    
    streamTargetBoxNode.scrollTop = streamTargetBoxNode.scrollHeight;
}

function sendChatMessageDirect() {
    const textInputNodeElement = document.getElementById("chat-text-input-field");
    const enteredMessageTextString = textInputNodeElement.value.trim();
    if(enteredMessageTextString === "" || !APP_STATE.currentUser || !APP_STATE.activeChatTargetUserHash) return;
    
    // --- FEATURE: EXECUTE DISPATCH BROADCAST PROCESSOR PIPELINES ---
    if (APP_STATE.activeChatTargetUserHash === 'broadcast_personal' || APP_STATE.activeChatTargetUserHash === 'broadcast_business') {
        executeSystemWideBroadcastTransmission(enteredMessageTextString, null);
        textInputNodeElement.value = "";
        return;
    }
    
    if(APP_STATE.activeChatTargetUserHash === 'admin') {
         alert("The Fort Mart profile can't be replied.");
         textInputNodeElement.value = "";
         return;
    }
    
    const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
    if(operationalThreadRecordData) {
        operationalThreadRecordData.messageLog.push({
            mid: "m_" + Date.now(),
            senderUid: APP_STATE.currentUser.uid,
            text: enteredMessageTextString,
            timestamp: new Date().toLocaleTimeString([], { day: '2-digit',  month: '2-digit', hour: '2-digit', minute: '2-digit' }),
            status: "single"
        });
        textInputNodeElement.value = "";
        renderUserConversationsLogRoster(); // Re-render target ledger layout row order arrays
        refreshMessengerActiveStreamBubblesDisplayList();
        syncPlatformDatabaseStateToWebStorage();
        
        executeAutoReplyEvaluationProcessFrame(operationalThreadRecordData);
    }
}

/**
 * File System Interface Operations Hooks Definitions
 */
function triggerMessageAttachedFileBrowserLink() {
    const targetFileInputNode = document.getElementById("chat-message-file-attachment-input");
    if (targetFileInputNode) {
        targetFileInputNode.click();
    }
}

function handleMessageAttachedFileSelectionEvent(inputNodeContextElement) {
    if (!inputNodeContextElement.files || inputNodeContextElement.files.length === 0) return;
    if (!APP_STATE.currentUser || !APP_STATE.activeChatTargetUserHash) return;
    if (APP_STATE.activeChatTargetUserHash === 'admin') {
         alert("The Fort Mart profile can't be replied.");
         inputNodeContextElement.value = "";
         return;
    }
    
    const singleFileReference = inputNodeContextElement.files[0];
    const checkIsImageFormatCondition = singleFileReference.type.startsWith('image/');
    const checkIsVideoFormatCondition = singleFileReference.type.startsWith('video/');
    
    const fileStorageProcessingReader = new FileReader();
    
    fileStorageProcessingReader.onload = function(readerEvent) {
        // Build the core object configuration layout context state payload mapping
        const transportFilePayloadConfig = {
            isFile: true,
            isImage: checkIsImageFormatCondition,
            isVideo: checkIsVideoFormatCondition,
            fileData: readerEvent.target.result
        };

        // Check for active broadcast targets during selection workflows
        if (APP_STATE.activeChatTargetUserHash === 'broadcast_personal' || APP_STATE.activeChatTargetUserHash === 'broadcast_business') {
            executeSystemWideBroadcastTransmission(singleFileReference.name, transportFilePayloadConfig);
            inputNodeContextElement.value = "";
            return;
        }

        const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
        if (operationalThreadRecordData) {
            operationalThreadRecordData.messageLog.push({
                mid: "m_file_" + Date.now(),
                senderUid: APP_STATE.currentUser.uid,
                text: singleFileReference.name,
                isFile: true,
                isImage: checkIsImageFormatCondition,
                isVideo: checkIsVideoFormatCondition,
                fileData: readerEvent.target.result,
                timestamp: new Date().toLocaleTimeString([], { day: '2-digit',  month: '2-digit', hour: '2-digit', minute: '2-digit' }),
                status: "single"
            });
            inputNodeContextElement.value = "";
            renderUserConversationsLogRoster();
            refreshMessengerActiveStreamBubblesDisplayList();
            syncPlatformDatabaseStateToWebStorage();
            
            executeAutoReplyEvaluationProcessFrame(operationalThreadRecordData);
        }
    };
    
    fileStorageProcessingReader.readAsDataURL(singleFileReference);
}

/**
 * --- FEATURE: ADMIN BROADCAST ROUTING SYSTEM ENGINE ---
 */
function executeSystemWideBroadcastTransmission(textPayloadString, filePackageConfigObject) {
    const targetGroupString = APP_STATE.activeChatTargetUserHash === 'broadcast_personal' ? 'personal' : 'business';
    const destinationAccountsArray = SYSTEM_DATABASE.users.filter(u => u.accountType === targetGroupString && u.uid !== 'admin');
    if (destinationAccountsArray.length === 0) {
        alert("System Notice: Broadcast processing aborted. Target account dataset matches zero profile indices records.");
        return;
    }
    
    destinationAccountsArray.forEach((profileRecord, arrayIndex) => {
        let uniqueTargetThreadNode = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes('admin') && c.dynamicParticipants.includes(profileRecord.uid));
        
        if (!uniqueTargetThreadNode) {
            uniqueTargetThreadNode = {
                chatId: `chat_admin_${profileRecord.uid}`,
                dynamicParticipants: ['admin', profileRecord.uid],
                messageLog: []
            };
            SYSTEM_DATABASE.chats.push(uniqueTargetThreadNode);
        }
        
        // Form transmission bundle message payload properties block
        const baseMessageData = {
            mid: `m_bcast_${Date.now()}_${arrayIndex}`,
            senderUid: 'admin',
            text: textPayloadString,
            timestamp: new Date().toLocaleTimeString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
            status: "single"
        };
        if (filePackageConfigObject) {
            baseMessageData.isFile = filePackageConfigObject.isFile;
            baseMessageData.isImage = filePackageConfigObject.isImage;
            baseMessageData.isVideo = filePackageConfigObject.isVideo;
            baseMessageData.fileData = filePackageConfigObject.fileData;
        }
        
        uniqueTargetThreadNode.messageLog.push(baseMessageData);
    });
    
    alert(`Broadcast routed successfully to all ${destinationAccountsArray.length} active ${targetGroupString} profile logs.`);
    renderUserConversationsLogRoster();
    syncPlatformDatabaseStateToWebStorage();
}

/**
 * Bubble Level Action Controls Core Utilities
 */
function executeMessageTextCopyClipboard(messageIdentifierKey) {
    const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
    if (!operationalThreadRecordData) return;
    
    const exactMessagePayloadMatch = operationalThreadRecordData.messageLog.find(m => m.mid === messageIdentifierKey);
    if (exactMessagePayloadMatch) {
        navigator.clipboard.writeText(exactMessagePayloadMatch.text).catch(err => {
            console.error("System Matrix Clipboard Exception Handling Log:", err);
        });
    }
}

// --- FEATURE: DELETE FOR ME ROUTINE LOGIC ---
function executeSelectedBubbleMessagePurge(messageIdentifierKey) {
    const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
    if (!operationalThreadRecordData) return;
    
    const exactMessagePayloadMatch = operationalThreadRecordData.messageLog.find(m => m.mid === messageIdentifierKey);
    if (exactMessagePayloadMatch) {
        if (!exactMessagePayloadMatch.deletedBy) {
            exactMessagePayloadMatch.deletedBy = [];
        }
        // Save current user index inside exclusions list array context parameters
        if (!exactMessagePayloadMatch.deletedBy.includes(APP_STATE.currentUser.uid)) {
            exactMessagePayloadMatch.deletedBy.push(APP_STATE.currentUser.uid);
        }
        syncPlatformDatabaseStateToWebStorage();
        renderUserConversationsLogRoster();
        refreshMessengerActiveStreamBubblesDisplayList();
    }
}

// --- FEATURE: DELETE FOR ALL ROUTINE LOGIC ---
function executeSelectedBubbleMessagePurgeForAll(messageIdentifierKey) {
    const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
    if (!operationalThreadRecordData) return;
    
    const recordIndexTargetLocation = operationalThreadRecordData.messageLog.findIndex(m => m.mid === messageIdentifierKey);
    if (recordIndexTargetLocation !== -1) {
        // Completely strip message data entry from global stream object arrays lists blocks
        operationalThreadRecordData.messageLog.splice(recordIndexTargetLocation, 1);
        syncPlatformDatabaseStateToWebStorage();
        renderUserConversationsLogRoster(); // Refresh order indexes parameters matching changes triggers
        refreshMessengerActiveStreamBubblesDisplayList();
    }
}

function executeMessageFileDownloadTracker(messageIdentifierKey) {
    const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
    if (!operationalThreadRecordData) return;
    const exactMessagePayloadMatch = operationalThreadRecordData.messageLog.find(m => m.mid === messageIdentifierKey);
    if (exactMessagePayloadMatch && exactMessagePayloadMatch.isFile && exactMessagePayloadMatch.fileData) {
        const structuralAnchorDownloadElement = document.createElement("a");
        structuralAnchorDownloadElement.href = exactMessagePayloadMatch.fileData;
        structuralAnchorDownloadElement.download = exactMessagePayloadMatch.text;
        document.body.appendChild(structuralAnchorDownloadElement);
        structuralAnchorDownloadElement.click();
        document.body.removeChild(structuralAnchorDownloadElement);
    }
}

function executeAutoReplyEvaluationProcessFrame(operationalThreadRecordData) {
    const counterpartyAccountProfile = SYSTEM_DATABASE.users.find(u => u.uid === APP_STATE.activeChatTargetUserHash);
    if(counterpartyAccountProfile && APP_STATE.activeChatTargetUserHash !== 'admin') {
        const totalOutboundLinesCount = operationalThreadRecordData.messageLog.filter(m => m.senderUid === APP_STATE.currentUser.uid).length;
        if(totalOutboundLinesCount === 1) {
            setTimeout(() => {
                operationalThreadRecordData.messageLog.push({
                    mid: "m_auto_" + Date.now(),
                    senderUid: counterpartyAccountProfile.uid,
                    text: `[Automated Assistant System Broadcast Response Mapping Engine Log]: Thank you for reaching out to ${counterpartyAccountProfile.businessName || counterpartyAccountProfile.identityName}. Your commercial request lines have been safely indexed. We will get back to you soon.`,
                    timestamp: new Date().toLocaleTimeString([], { day: '2-digit',  month: '2-digit', hour: '2-digit', minute: '2-digit' }),
                    status: "bold-double"
                });
 
                renderUserConversationsLogRoster();
                refreshMessengerActiveStreamBubblesDisplayList();
                syncPlatformDatabaseStateToWebStorage();
            }, 1500);
        }
    }
}

function executeWipeEntireDialogueLogsHistoryContextChain() {
    displayConfirmationModalOverlayAction("Are you absolutely sure you want to purge all text rows entries inside this workspace log trace container? This cannot be undone.", () => {
        const threadIndexId = SYSTEM_DATABASE.chats.findIndex(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
        if(threadIndexId !== -1) {
            SYSTEM_DATABASE.chats[threadIndexId].messageLog = [];
            syncPlatformDatabaseStateToWebStorage();
            renderUserConversationsLogRoster();
            refreshMessengerActiveStreamBubblesDisplayList();
        }
    });
}

/**
 * File System Interface Operations Hooks Definitions
 */
function triggerMessageAttachedFileBrowserLink() {
    const targetFileInputNode = document.getElementById("chat-message-file-attachment-input");
    if (targetFileInputNode) {
        targetFileInputNode.click();
    }
}

function handleMessageAttachedFileSelectionEvent(inputNodeContextElement) {
    if (!inputNodeContextElement.files || inputNodeContextElement.files.length === 0) return;
    if (!APP_STATE.currentUser || !APP_STATE.activeChatTargetUserHash) return;
    
    if (APP_STATE.activeChatTargetUserHash === 'admin') {
         alert("The Fort Mart profile can't be replied.");
         inputNodeContextElement.value = "";
         return;
    }
    
    const singleFileReference = inputNodeContextElement.files[0];
    const checkIsImageFormatCondition = singleFileReference.type.startsWith('image/');
    const fileStorageProcessingReader = new FileReader();
    
    fileStorageProcessingReader.onload = function(readerEvent) {
        const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
        
        if (operationalThreadRecordData) {
            operationalThreadRecordData.messageLog.push({
                mid: "m_file_" + Date.now(),
                senderUid: APP_STATE.currentUser.uid,
                text: singleFileReference.name,
                isFile: true,
                isImage: checkIsImageFormatCondition, // Explicitly tracks if an img element context processing path applies
                fileData: readerEvent.target.result, // base64 data URL string payload signature 
                timestamp: new Date().toLocaleTimeString([], { day: '2-digit',  month: '2-digit', hour: '2-digit', minute: '2-digit' }),
                status: "single"
            });
            
            inputNodeContextElement.value = ""; // Clear input browser tracking element states
            refreshMessengerActiveStreamBubblesDisplayList();
            syncPlatformDatabaseStateToWebStorage();
            
            executeAutoReplyEvaluationProcessFrame(operationalThreadRecordData);
        }
    };
    
    fileStorageProcessingReader.readAsDataURL(singleFileReference);
}

/**
 * Bubble Level Action Controls Core Utilities
 */
function executeMessageTextCopyClipboard(messageIdentifierKey) {
    const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
    if (!operationalThreadRecordData) return;
    
    const exactMessagePayloadMatch = operationalThreadRecordData.messageLog.find(m => m.mid === messageIdentifierKey);
    if (exactMessagePayloadMatch) {
        navigator.clipboard.writeText(exactMessagePayloadMatch.text).catch(err => {
            console.error("System Matrix Clipboard Exception Handling Log:", err);
        });
    }
}

function executeSelectedBubbleMessagePurge(messageIdentifierKey) {
    const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
    if (!operationalThreadRecordData) return;
    
    const recordIndexTargetLocation = operationalThreadRecordData.messageLog.findIndex(m => m.mid === messageIdentifierKey);
    if (recordIndexTargetLocation !== -1) {
        operationalThreadRecordData.messageLog.splice(recordIndexTargetLocation, 1);
        syncPlatformDatabaseStateToWebStorage();
        refreshMessengerActiveStreamBubblesDisplayList();
    }
}

function executeMessageFileDownloadTracker(messageIdentifierKey) {
    const operationalThreadRecordData = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
    if (!operationalThreadRecordData) return;
    
    const exactMessagePayloadMatch = operationalThreadRecordData.messageLog.find(m => m.mid === messageIdentifierKey);
    if (exactMessagePayloadMatch && exactMessagePayloadMatch.isFile && exactMessagePayloadMatch.fileData) {
        const structuralAnchorDownloadElement = document.createElement("a");
        structuralAnchorDownloadElement.href = exactMessagePayloadMatch.fileData;
        structuralAnchorDownloadElement.download = exactMessagePayloadMatch.text;
        document.body.appendChild(structuralAnchorDownloadElement);
        structuralAnchorDownloadElement.click();
        document.body.removeChild(structuralAnchorDownloadElement);
    }
}

function executeAutoReplyEvaluationProcessFrame(operationalThreadRecordData) {
    // Simulate automated auto reply tracking matrices workflows configurations logic blocks checks triggers rules parameters
    const counterpartyAccountProfile = SYSTEM_DATABASE.users.find(u => u.uid === APP_STATE.activeChatTargetUserHash);
    if(counterpartyAccountProfile && APP_STATE.activeChatTargetUserHash !== 'admin') {
        // Check if thread contains exactly one outbound entry to qualify under "First-Contact Auto-Reply Automations Constraints Parameters" parameters rule engine constraints
        const totalOutboundLinesCount = operationalThreadRecordData.messageLog.filter(m => m.senderUid === APP_STATE.currentUser.uid).length;
        if(totalOutboundLinesCount === 1) {
            setTimeout(() => {
                operationalThreadRecordData.messageLog.push({
                    mid: "m_auto_" + Date.now(),
                    senderUid: counterpartyAccountProfile.uid,
                    text: `[Automated Assistant System Broadcast Response Mapping Engine Log]: Thank you for reaching out to ${counterpartyAccountProfile.businessName || counterpartyAccountProfile.identityName}. Your commercial request lines have been safely indexed. We will get back to you soon.`,
                    timestamp: new Date().toLocaleTimeString([], { day: '2-digit',  month: '2-digit', hour: '2-digit', minute: '2-digit' }),
                    status: "bold-double"
                });
                refreshMessengerActiveStreamBubblesDisplayList();
                syncPlatformDatabaseStateToWebStorage();
            }, 1500);
        }
    }
}

function executeWipeEntireDialogueLogsHistoryContextChain() {
    displayConfirmationModalOverlayAction("Are you absolutely sure you want to purge all text rows entries inside this workspace log trace container? This cannot be undone.", () => {
        const threadIndexId = SYSTEM_DATABASE.chats.findIndex(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes(APP_STATE.activeChatTargetUserHash));
        if(threadIndexId !== -1) {
            SYSTEM_DATABASE.chats[threadIndexId].messageLog = [];
            syncPlatformDatabaseStateToWebStorage();
            refreshMessengerActiveStreamBubblesDisplayList();
        }
    });
}

/**
 * Universal Unified Infrastructure Floating Operations System Controller Launcher Method Engine
 */
function handleFloatingActionButtonTrigger() {
    if(!APP_STATE.currentUser) {
        triggerAuthenticationModalSequence();
        return;
    }
    
    // Evaluate operational dynamic parameters rules routes contexts relative to view page positions
    if(APP_STATE.currentUser.accountType !== 'business' && APP_STATE.currentUser.uid !== 'admin') {
        alert("Personal Accounts can't upload products.");
        return;
    }
    
    // Launch Dynamic Upload Product Framework Canvas Template Window Modals Engine
    launchUploadProductInventoryModalFormLayoutShell();
}

function launchUploadProductInventoryModalFormLayoutShell() {
    const modalContentTargetNode = document.getElementById("auth-modal-content");
    modalContentTargetNode.innerHTML = `
        <h3>Product Upload Modal</h3>
        <p style="font-size:0.8rem; color:var(--fort-gray-slate); margin-top:2px;">Products created are localized and viewable exclusively within corresponding matching legal registration domain regions [Country Scope: <strong>${APP_STATE.currentUser.country}</strong>]</p>
        
        <div class="form-input-container margin-top-sm">
            <label>Product Name</label>
            <input type="text" id="newprod-name" class="form-field-control" placeholder="Enter concise commercial inventory title text">
        </div>
        <div class="form-input-container">
            <label>Select Logistics Catalog Classification Category:</label>
            <select id="newprod-cat" class="form-field-control">
                <option value="Electrical Appliances">Electrical Appliances</option>
                <option value="Mobile Devices & Computers">Mobile Devices & Computers</option>
                <option value="Home Furniture">Home Furniture</option>
                <option value="Fashion Clothing Apparel">Fashion Clothing Apparel</option>
                <option value= "Others">Others</option>
            </select>
        </div>
        <div class="form-input-container">
            <label>Primary Short Public Marketing Overview Description (Max 100 Chars):</label>
            <input type="text" id="newprod-info" class="form-field-control" maxlength="100" placeholder="Max 100 text characters symbols structural limits constraints loops">
        </div>
        <div class="form-input-container-image">
            <label>Upload and Preview your Image</label>
            <div class="preview-box" style="min-height: 100px; display: flex; align-items: center; justify-content: center; border: 1px dashed #ccc; margin-bottom: 10px;">
                <span id="placeholderTextimg">No image selected</span>
                <img id="imagePreview" alt="Image Preview" style="max-width: 100%; max-height: 200px; display: none;">
            </div>
            <input type="file" id="imageInput" accept="image/*">
        </div>
        <br>
        <div class="form-input-container">
            <label>More Info and Specifications</label>
            <textarea id="newprod-aiinfo" class="form-field-control rounded-rect" style="height:60px;" placeholder="A more detailed explanation of product. (Optional but recommended)"></textarea>
        </div>
        <div class="form-input-container">
            <label>Unit Commercial Pricing Valuation Baseline Quote Amount Number (${APP_STATE.currentUser.country === 'Nigeria' ? '₦' : '$'}):</label>
            <input type="number" id="newprod-price" class="form-field-control" placeholder="Enter numeric base rate configuration">
        </div>
        
        <div class="btn-group margin-top-md">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Cancel Form</button>
            <button onclick="executePipelineCommitNewInventoryPostRecord()" class="btn-blue">Publish Active Post</button>
        </div>
    `;

    // Visual Bug Fix: Close matching tags and attach file listener
    setupImagePreviewListener();
    document.getElementById("auth-modal").classList.add("active");
}

// Logic Addition: Handles live preview display
function setupImagePreviewListener() {
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const placeholderText = document.getElementById("placeholderTextimg");

    imageInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
                placeholderText.style.display = "none";
            }
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = "";
            imagePreview.style.display = "none";
            placeholderText.style.display = "block";
        }
    });
}

function executePipelineCommitNewInventoryPostRecord() {
    const name = document.getElementById("newprod-name").value.trim();
    const cat = document.getElementById("newprod-cat").value;
    const info = document.getElementById("newprod-info").value.trim();
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const aiInfo = document.getElementById("newprod-aiinfo").value.trim();
    const priceRaw = document.getElementById("newprod-price").value;
    
    // Logic Fix: Validate if an actual file was selected instead of string path
    if(name === "" || info === "" || priceRaw === "" || !imageInput.files[0]) {
        alert("All compulsory info must be imputed.");
        return;
    }
    
    // Logic Fix: Save actual Base64 visual image string representation data 
    const productImgDataUrl = imagePreview.src;

    const finalProductInstanceObjectNode = {
        pid: "p_" + Date.now(),
        ownerUid: APP_STATE.currentUser.uid,
        name: name,
        category: cat,
        info: info,
        price: parseFloat(priceRaw),
        coverPhoto: productImgDataUrl,
        aiInfo: aiInfo || "Standard platform baseline listed trading stock profile object reference specifications tracking structure model elements values data parameters.",
        clickCount: 0
    };
    
    SYSTEM_DATABASE.products.push(finalProductInstanceObjectNode);
    syncPlatformDatabaseStateToWebStorage();
    
    closeActiveModalDirectly('auth-modal');
    alert("System Pipeline Core Notification Process Switch Event Alert: Product Uploading Request Sent Succesfully.");
    
    renderMarketplaceProductsDisplayLoop();
}

/**
 * Intelligent Cognitive AI Framework Search Integration Engine Assistant Workspace Panel Module
 */
let COGNITIVE_AI_SESSION_MOCK_STREAM_LOGS_ARRAY = [
    { source: "ai", text: "Greetings! I am the integrated Fort AI Systems Cognitive Assistant. I possess complete operational system diagnostic metrics blueprints maps details to aid your experience. Ask me anything regarding site rules, features layout systems controls parameters, or dynamic product functionalities analysis schemas profiles.", graphics: null }
];

function initializeFortAiChatWindowWorkspace() {
    refreshAiAssistantBubbleLayoutStreamScroller();
}

function routeProductContextInquiryDirectlyToAiAssistant(productIdKeyValString) {
    const matchObj = SYSTEM_DATABASE.products.find(p => p.pid === productIdKeyValString);
    if(matchObj) {
         APP_STATE.fortAiActiveTaggedProductObject = matchObj;
         COGNITIVE_AI_SESSION_MOCK_STREAM_LOGS_ARRAY.push({
              source: "user",
              text: `[System Context Bound Reference Trigger Mapping Attach Element Event]: Actively inspecting target inventory trace: "${matchObj.name}". Please outline functional specs overview mappings indices.`,
              graphics: null
         });
         
         navigateToPage('fort-ai');
         
         // Trigger automated delayed downstream intelligence mapping lookup responses structures vectors sets algorithms
         setTimeout(() => {
             COGNITIVE_AI_SESSION_MOCK_STREAM_LOGS_ARRAY.push({
                 source: "ai",
                 text: `Analyzing core technical tracking schemas variables metrics data blocks references for inventory profile item listing matching key: "${matchObj.name}". Found metadata profiles: ${matchObj.info} Additional AI Parameters Framework Blueprint Specs Mapping Log reads: ${matchObj.aiInfo}`,
                 graphics: null
             });
             refreshAiAssistantBubbleLayoutStreamScroller();
         }, 1000);
    }
}

function refreshAiAssistantBubbleLayoutStreamScroller() {
    const containerTargetNode = document.getElementById("ai-chat-bubble-scroller");
    if(!containerTargetNode) return;
    
    containerTargetNode.innerHTML = "";
    
    const tagLabelNode = document.getElementById("ai-active-product-tag");
    if(APP_STATE.fortAiActiveTaggedProductObject) {
        tagLabelNode.innerText = `🏷️ Context Anchor Active: ${APP_STATE.fortAiActiveTaggedProductObject.name}`;
        tagLabelNode.classList.remove("hidden-node");
    } else {
        tagLabelNode.classList.add("hidden-node");
    }
    
    COGNITIVE_AI_SESSION_MOCK_STREAM_LOGS_ARRAY.forEach(row => {
        const bubbleNodeElement = document.createElement("div");
        const aiFlagCondition = row.source === 'ai';
        bubbleNodeElement.className = `chat-bubble-node rounded-rect ${aiFlagCondition ? 'incoming-msg' : 'outgoing-msg'}`;
        if(aiFlagCondition) {
             bubbleNodeElement.style.backgroundColor = "#e0f2f1"; // unique assistant panel visual tracking color
        }
        
        bubbleNodeElement.innerHTML = `
            <p style="font-weight:${aiFlagCondition ? '500' : '400'};">${row.text}</p>
            <div class="msg-meta-row"><span>Fort AI Core</span></div>
        `;
        containerTargetNode.appendChild(bubbleNodeElement);
    });
    
    containerTargetNode.scrollTop = containerTargetNode.scrollHeight;
}

function submitAiQueryRequest() {
    const inputNode = document.getElementById("ai-text-input-field");
    const QueryString = inputNode.value.trim();
    if(QueryString === "") return;
    
    COGNITIVE_AI_SESSION_MOCK_STREAM_LOGS_ARRAY.push({ source: "user", text: QueryString, graphics: null });
    inputNode.value = "";
    refreshAiAssistantBubbleLayoutStreamScroller();
    
    // Cognitive execution sequence parsing rules matches patterns behaviors
    setTimeout(() => {
        let responseLineText = "I have queried the global external web references databases indices to parse your evaluation request parameters loops tracking metrics constraints, but found no direct infrastructure adjustments. Please clarify details.";
        const normalizedInput = QueryString.toLowerCase();
        
        if(normalizedInput.includes("admin") || normalizedInput.includes("password") || normalizedInput.includes("login")) {
            responseLineText = "System Operational Guide Rule Mapping Log: Global system platform management accounts operate via dial prefix selector set 'Nigeria +234' with access credentials handle matching text string 'Fort Mart'. Core parameters entries cannot be reset without validation.";
        } else if(normalizedInput.includes("shipping") || normalizedInput.includes("currency") || normalizedInput.includes("country")) {
            responseLineText = "System Architecture Framework Parameters Metric Check: Core product matching streams currency symbols outputs (₦ or $) adjust dynamically checking localized regional geo settings identifiers attributes logged when registering.";
        } else if(normalizedInput.includes("hello") || normalizedInput.includes("hi ")) {
            responseLineText = "Hello! I am standing by to process system tools troubleshooting questions, core features mapping descriptions parameters traces, or catalog asset lookup evaluations requests.";
        }
        
        COGNITIVE_AI_SESSION_MOCK_STREAM_LOGS_ARRAY.push({ source: "ai", text: responseLineText, graphics: null });
        refreshAiAssistantBubbleLayoutStreamScroller();
    }, 1200);
}

function clearAiChatHistory() {
    displayConfirmationModalOverlayAction("Are you sure you want to clear your current AI conversation session window timeline logs traces baseline elements matrices indexes?", () => {
        COGNITIVE_AI_SESSION_MOCK_STREAM_LOGS_ARRAY = [
            { source: "ai", text: "Session timeline memory traces purged successfully. Framework canvas running clean. State system standing by to parse inquiries models.", graphics: null }
        ];
        APP_STATE.fortAiActiveTaggedProductObject = null;
        refreshAiAssistantBubbleLayoutStreamScroller();
    });
}

/**
 * Profile Settings, Dynamic User Info Data Mutation & Feedback Subsystem Controllers Modules
 */
function switchSettingsSection(selectedSectionTabIdKey) {
    document.querySelectorAll(".settings-tab-btn").forEach(btn => btn.classList.remove("active")); // [cite: 295, 424, 469]
    document.querySelectorAll(".settings-sub-panel").forEach(panel => panel.classList.add("hidden-node")); // [cite: 296, 425, 470]
    
    // Activate target parameters arrays tracking nodes loops elements
    event.currentTarget.classList.add("active"); // [cite: 296, 425, 470]
    document.getElementById(`settings-node-${selectedSectionTabIdKey}`).classList.remove("hidden-node"); // [cite: 296, 425, 470]
    if(selectedSectionTabIdKey === 'my-products') {
         renderAccountInventoryLedgerManagementDashboardGrid(); // [cite: 297, 425, 471]
    }
}

function initializeProfileDetailsAccountManagementFieldsValues() {
    if(!APP_STATE.currentUser) return; // [cite: 298, 426, 472]
    
    // Fallback default system vector if no custom avatar data is assigned to user account profile
    const globalDefaultVectorAvatarURI = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230288d1'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/></svg>";
    const operationalActiveAvatarImageSrc = APP_STATE.currentUser.avatar || globalDefaultVectorAvatarURI;

    // 1. Update the account settings file manager overview profile box container 
    const profilePaneAvatarNodeFrame = document.getElementById("profile-pane-avatar-display");
    if(profilePaneAvatarNodeFrame) {
        profilePaneAvatarNodeFrame.src = operationalActiveAvatarImageSrc;
    }

    // 2. Update the dynamic navigation bar actions trigger frame avatar container
    const navUserAvatarNodeFrame = document.getElementById("nav-user-avatar");
    if(navUserAvatarNodeFrame) {
        navUserAvatarNodeFrame.src = operationalActiveAvatarImageSrc;
    }

    // 3. Update the side menu control drawer container interface layout node avatar
    const drawerUserAvatarNodeFrame = document.getElementById("drawer-user-avatar");
    if(drawerUserAvatarNodeFrame) {
        drawerUserAvatarNodeFrame.src = operationalActiveAvatarImageSrc;
    }

    // Sync alphanumeric display keys strings tracking targets labels text nodes registers
    document.getElementById("txt-profile-username-val").innerText = APP_STATE.currentUser.identityName; 
    
    const bizFieldsNodeWrapper = document.getElementById("business-profile-only-fields"); 
    if(APP_STATE.currentUser.accountType === 'business' || APP_STATE.currentUser.uid === 'admin') { 
        bizFieldsNodeWrapper.classList.remove("hidden-node"); 
        document.getElementById("txt-profile-busname-val").innerText = APP_STATE.currentUser.businessName || "N/A"; 
        document.getElementById("txt-profile-businfo-val").innerText = APP_STATE.currentUser.businessInfo || "N/A"; 
    } else {
        bizFieldsNodeWrapper.classList.add("hidden-node"); 
    }
}

function openProfileEditWizard(targetFieldNameStringTokenKey) {
    const modalTargetNode = document.getElementById("auth-modal-content"); 
    modalTargetNode.innerHTML = `
        <h3>Enter Current Password(Step 1 of 3)</h3>
        <p style="font-size:0.85rem; color:var(--fort-blue-dark); margin-top:4px;">To execute administrative profile changes tracking variables fields structural configurations data sets adjustments, confirm your current active account verification safety access password phrase key:</p>
        <div class="form-input-container margin-top-sm">
            <label>Active Profile Validation Password Expression Key Phrase:</label>
            <input type="password" id="profile-reauth-key" class="form-field-control" placeholder="Enter password to verify ownership context">
            <div class="margin-top-xs">
                <input type="checkbox" id="chk-signin-showpass" onchange="toggleFormPasswordFieldVisibility(this, 'profile-reauth-key')">
                <label for="chk-signin-showpass" style="font-size:0.85rem; font-weight:400;">Show Password</label>
            </div>
            <div id="err-profile-reauth-msg" class="text-danger-alert hidden-node">Incorrect Password</div>
        </div>
        <div class="btn-group">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Cancel</button> 
            <button onclick="executeValidateProfileReauthSessionTokenStep('${targetFieldNameStringTokenKey}')" class="btn-blue">Verify Password Phrase</button>
        </div>
    `; 
    document.getElementById("auth-modal").classList.add("active"); 
}

function executeValidateProfileReauthSessionTokenStep(targetFieldNameStringTokenKey) {
    const enteredPass = document.getElementById("profile-reauth-key").value; 
    const errNode = document.getElementById("err-profile-reauth-msg"); 
    errNode.classList.add("hidden-node"); 
    
    if(enteredPass !== APP_STATE.currentUser.secretKey) { 
        errNode.innerText = "Incorrect Password"; 
        errNode.classList.remove("hidden-node"); 
        return; 
    }
    
    // Advanced step layout wizard mapping chain pipeline tracking structural parameter states
    const modalTargetNode = document.getElementById("auth-modal-content"); 
    modalTargetNode.innerHTML = `
        <h3>Modify Profile Parameters Node Log - Validate Ownership Context (Step 2 of 3)</h3>
        <p style="font-size:0.85rem; margin-top:4px;">Input your unique 4-digit Account Authentication Verification Code to confirm you want to change your info:</p>
        <div class="form-input-container margin-top-sm">
            <label>Input Verification Code:</label>
            <input type="text" id="profile-reauth-otp" class="form-field-control" placeholder="Enter 4-digit verification code">
            <div id="err-profile-reauth-otp-msg" class="text-danger-alert hidden-node">Incorrect</div> 
        </div>
        <div class="btn-group">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Cancel</button> 
            <button onclick="executeFinalProfileDataEditCommitStepThreeFormLayout('${targetFieldNameStringTokenKey}')" class="btn-blue">Verify Process</button> 
        </div>
    `; 
}

// Temporary variable to track image selections locally during the 3rd step layout
let TEMPORARY_PROFILE_AVATAR_DATA_URL = ""; 

function executeFinalProfileDataEditCommitStepThreeFormLayout(targetFieldNameStringTokenKey) {
    const enteredOtp = document.getElementById("profile-reauth-otp").value.trim(); 
    const errNode = document.getElementById("err-profile-reauth-otp-msg"); 
    errNode.classList.add("hidden-node"); 
    
    // Extract real identity authentication baseline constraints safely
    const actualAuthCode = String(
        APP_STATE.currentUser.UserAccountAuthenticationVerificationCode || 
        APP_STATE.currentUser.verificationCode || 
        ""
    ).trim(); 
    
    if(enteredOtp !== actualAuthCode) { 
         errNode.innerText = "Incorrect verification code"; 
         errNode.classList.remove("hidden-node"); 
         return; 
    }
    
    const modalTargetNode = document.getElementById("auth-modal-content"); 
    // Inject custom target property modification text boxes fields configurations elements tracking structures mapping logic values
    let injectionMarkupFormHTML = ""; 
    TEMPORARY_PROFILE_AVATAR_DATA_URL = ""; // Reset temporary memory block 
    
    if(targetFieldNameStringTokenKey === 'username') { 
        injectionMarkupFormHTML = `
            <label>Define New Profile User Identity Display Label Title Name:</label>
            <input type="text" id="new-profile-val-field" class="form-field-control" value="${APP_STATE.currentUser.identityName}">
        `; 
    } else if(targetFieldNameStringTokenKey === 'businessName') { 
        injectionMarkupFormHTML = `
            <label>Define New Corporate Legal Trading Entity Name Label Struct [Changeable once in 60 days limits tracking rules]:</label>
            <input type="text" id="new-profile-val-field" class="form-field-control" value="${APP_STATE.currentUser.businessName || ''}">
        `; 
    } else if(targetFieldNameStringTokenKey === 'businessInfo') {
        injectionMarkupFormHTML = `
            <label>Define New Public Summary Overview Descriptive Information Paragraph Frame Struct [Changeable once in 30 days limits]:</label>
            <input type="text" id="new-profile-val-field" class="form-field-control" value="${APP_STATE.currentUser.businessInfo || ''}">
        `; 
    } else if(targetFieldNameStringTokenKey === 'password') { 
        injectionMarkupFormHTML = `
            <label>Define New Hardened Core Account Access Entry Security Key Password String Expression:</label>
            <input type="password" id="new-profile-val-field" class="form-field-control" placeholder="Input New Password Syntax Combo">
            <label class="margin-top-xs">Re-type Code Syntax to Confirm Structural Convergence Parity Logic Matches:</label>
            <input type="password" id="new-profile-val-field-confirm" class="form-field-control" placeholder="Confirm New Password Syntax Combo">
            <div id="err-profile-pass-complex-feedback-lbl" class="text-danger-alert hidden-node"></div>
        `; 
    } else if(targetFieldNameStringTokenKey === 'avatar') { 
        const currentAvatarSrc = APP_STATE.currentUser.avatar || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230288d1'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/></svg>"; // [cite: 443, 444, 495, 496]
        injectionMarkupFormHTML = `
            <label>Modify Profile Image File Node Vector:</label>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; margin: 15px 0;">
                <div class="large-avatar-frame circle-container" style="width: 110px; height: 110px; position: relative; overflow: hidden; border-radius: 50%;">
                    <img id="profile-edit-wizard-avatar-preview" src="${currentAvatarSrc}" alt="Avatar Preview" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <input type="file" id="new-profile-avatar-file-input" class="form-field-control" accept=".png, .jpg, .jpeg" onchange="processWizardAvatarFileSelectionDirectly()">
            </div>
            <input type="hidden" id="new-profile-val-field" value="AVATAR_MUTATION_TOKEN">
        `; 
    }
    
    modalTargetNode.innerHTML = `
        <h3>Modify Profile Parameters Node Log - Commit Data Value Mutation (Step 3 of 3)</h3>
        <div class="form-input-container margin-top-md">
            ${injectionMarkupFormHTML}
        </div>
        <div class="btn-group">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Discard Mutation</button>
            <button onclick="executePipelineSaveFinalProfileFieldsValuesChanges('${targetFieldNameStringTokenKey}')" class="btn-blue">Commit System Database Save</button> 
        </div>
    `; 
}

function processWizardAvatarFileSelectionDirectly() {
    const fileNode = document.getElementById("new-profile-avatar-file-input"); 
    if(fileNode && fileNode.files && fileNode.files[0]) { 
        const readerInstance = new FileReader(); 
        readerInstance.onload = function(e) { 
            TEMPORARY_PROFILE_AVATAR_DATA_URL = e.target.result; 
            const previewImageElement = document.getElementById("profile-edit-wizard-avatar-preview"); 
            if(previewImageElement) { 
                previewImageElement.src = e.target.result; 
            }
        };
        readerInstance.readAsDataURL(fileNode.files[0]); 
    }
}

function executePipelineSaveFinalProfileFieldsValuesChanges(targetFieldNameStringTokenKey) {
    const inputPrimaryElement = document.getElementById("new-profile-val-field"); 
    let targetCoreMutationStringValueValue = inputPrimaryElement ? inputPrimaryElement.value.trim() : ""; 
    
    // Strict intercept validation tracking metrics scopes for password complex structure criteria assertions rules values
    if(targetFieldNameStringTokenKey === 'password') { 
         const p2 = document.getElementById("new-profile-val-field-confirm").value; 
         const errLabel = document.getElementById("err-profile-pass-complex-feedback-lbl"); 
         errLabel.classList.add("hidden-node"); 
         
         if(targetCoreMutationStringValueValue !== p2) { 
             errLabel.innerText = "Entry verification parity error discovery matches logic syntax profiles fields values checks loops configurations models."; 
             errLabel.classList.remove("hidden-node"); 
             return; 
         }
         
         // Fixed syntax pattern: corrected extra double bracket bracket syntax '[[^A-Za-z0-9]' to '[^A-Za-z0-9]'
         if(targetCoreMutationStringValueValue.length < 6 || !/[A-Z]/.test(targetCoreMutationStringValueValue) || !/[a-z]/.test(targetCoreMutationStringValueValue) || !/[0-9]/.test(targetCoreMutationStringValueValue) || !/[^A-Za-z0-9]/.test(targetCoreMutationStringValueValue)) { 
             errLabel.innerText = "Any password created should have at least one uppercase letter, one lowercase letter, one symbol, one number and should be at least six characters."; 
             errLabel.classList.remove("hidden-node"); 
             return; 
         }
    }
    
    if(targetFieldNameStringTokenKey === 'avatar') { 
        if(TEMPORARY_PROFILE_AVATAR_DATA_URL === "") { 
            alert("Field value entry parameter constraints validation alert: Please browse and select a valid profile picture file framework first.");
            return;
        }
        targetCoreMutationStringValueValue = TEMPORARY_PROFILE_AVATAR_DATA_URL;
    }
    
    if(targetCoreMutationStringValueValue === "") { 
        alert("Field value entry parameter constraints validation alert: Mutation cannot accept blank structural values mappings data sets logs expressions attributes."); 
        return; 
    }
    
    // Apply core localized data mutation mappings sets indices updates safely directly inside target data baseline arrays frameworks models keys pointers
    const targetedUserIndexId = SYSTEM_DATABASE.users.findIndex(u => u.uid === APP_STATE.currentUser.uid); 
    if(targetedUserIndexId !== -1) { 
        if(targetFieldNameStringTokenKey === 'username') SYSTEM_DATABASE.users[targetedUserIndexId].identityName = targetCoreMutationStringValueValue; 
        else if(targetFieldNameStringTokenKey === 'businessName') SYSTEM_DATABASE.users[targetedUserIndexId].businessName = targetCoreMutationStringValueValue; 
        else if(targetFieldNameStringTokenKey === 'businessInfo') SYSTEM_DATABASE.users[targetedUserIndexId].businessInfo = targetCoreMutationStringValueValue; 
        else if(targetFieldNameStringTokenKey === 'password') SYSTEM_DATABASE.users[targetedUserIndexId].secretKey = targetCoreMutationStringValueValue; 
        else if(targetFieldNameStringTokenKey === 'avatar') SYSTEM_DATABASE.users[targetedUserIndexId].avatar = targetCoreMutationStringValueValue;
        
        // Push structural administrative telemetry notification broadcast logging alert strings entries loop directly maps context thread channels structures parameters
        const automatedTelemetryLogEntryNotificationNodeValue = {
            mid: "telemetry_sys_" + Date.now(),
            senderUid: "admin",
            text: `[System Core Parameters Administrative Mutation Notification Broadcast Tracker Event Log Alert]: Security credential variables field pointer parameter "${targetFieldNameStringTokenKey}" value statement modified successfully on active execution logs registers maps frameworks tracking.`, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
            status: "bold-double"
        };
        
        let existingSystemAdminThreadNodePointerIndex = SYSTEM_DATABASE.chats.find(c => c.dynamicParticipants.includes(APP_STATE.currentUser.uid) && c.dynamicParticipants.includes("admin")); // [cite: 333, 249, 358]
        if(existingSystemAdminThreadNodePointerIndex) {
            existingSystemAdminThreadNodePointerIndex.messageLog.push(automatedTelemetryLogEntryNotificationNodeValue); 
        }
        
        // Sync working system memory caches directly back downstream into browser tracking mechanisms structures layers fields context
        APP_STATE.currentUser = SYSTEM_DATABASE.users[targetedUserIndexId]; 
        syncPlatformDatabaseStateToWebStorage(); 
        
        closeActiveModalDirectly('auth-modal'); 
        
        // Rerender all layout placeholders across the application instantly
        initializeProfileDetailsAccountManagementFieldsValues(); 
        
        alert("System Database Pipeline Notice Statement: Structural context updates compiled, verified, and saved safely to global baseline operational ledger data arrays registers mapping frameworks logs indicators parameters models values."); // [cite: 335, 251, 360]
    }
}

function renderAccountInventoryLedgerManagementDashboardGrid() {
    const listContainerNodeElement = document.getElementById("my-products-list-container");
    if(!listContainerNodeElement) return;
    
    listContainerNodeElement.innerHTML = "";
    
    if(!APP_STATE.currentUser) return;
    const userOwnedInventoryItemsArray = SYSTEM_DATABASE.products.filter(p => p.ownerUid === APP_STATE.currentUser.uid);
    
    if(userOwnedInventoryItemsArray.length === 0) {
        listContainerNodeElement.innerHTML = `<div style="padding:16px; color:var(--fort-gray-slate); font-size:0.85rem;"><p>Your profile data log lists no actively running commercial inventory postings indices structures metrics fields inside system clusters registries logs.</p></div>`;
        return;
    }
    
    userOwnedInventoryItemsArray.forEach(item => {
        const itemRowRowStripContainerElementNode = document.createElement("div");
        itemRowRowStripContainerElementNode.className = "rounded-rect";
        itemRowRowStripContainerElementNode.style.display = "flex";
        itemRowRowStripContainerElementNode.style.alignItems = "center";
        itemRowRowStripContainerElementNode.style.justifyContent = "between";
        itemRowRowStripContainerElementNode.style.padding = "12px";
        itemRowRowStripContainerElementNode.style.border = "1px solid var(--fort-gray-border)";
        itemRowRowStripContainerElementNode.style.marginBottom = "10px";
        itemRowRowStripContainerElementNode.style.backgroundColor = "var(--fort-white-snow)";
        
        itemRowRowStripContainerElementNode.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px; flex:1;">
                <img src="${item.coverPhoto}" style="width:40px; height:40px; object-fit:cover;" class="rounded-rect" alt="Thumb">
                <div>
                    <h5 style="font-weight:700; color:var(--fort-blue-dark);">${item.name}</h5>
                    <span style="font-size:0.75rem; color:var(--fort-gray-slate);">Category Vector Pointer Struct: ${item.category} | Analytics Metrics Impression Counter Hits Score Indicator Value: ${item.clickCount || 0} hits</span>
                </div>
            </div>
            <div style="display:flex; gap:8px;">
                <button class="btn-blue" style="padding:4px 10px; font-size:0.75rem;" onclick="launchEditProductInventoryModalFormLayoutShell('${item.pid}')">Edit Details</button>
                <button class="btn-danger" style="padding:4px 10px; font-size:0.75rem;" onclick="executeDeletePlatformInventoryItemListingPostRecord('${item.pid}')">Delete Inventory Post</button>
            </div>
        `;
        listContainerNodeElement.appendChild(itemRowRowStripContainerElementNode);
    });
}

function launchEditProductInventoryModalFormLayoutShell(targetProductIdKeyValueString) {
    // Locate the existing product record
    const targetProduct = SYSTEM_DATABASE.products.find(p => p.pid === targetProductIdKeyValueString);
    if (!targetProduct) {
        alert("Product record could not be found.");
        return;
    }

    const modalContentTargetNode = document.getElementById("auth-modal-content");
    modalContentTargetNode.innerHTML = `
        <h3>Edit Product Details</h3>
        <p style="font-size:0.8rem; color:var(--fort-gray-slate); margin-top:2px;">Updating information for your listed commercial asset.</p>
        
        <div class="form-input-container margin-top-sm">
            <label>Product Name</label>
            <input type="text" id="editprod-name" class="form-field-control" placeholder="Enter concise commercial inventory title text" value="${targetProduct.name}">
        </div>
        
        <div class="form-input-container">
            <label>Select Logistics Catalog Classification Category:</label>
            <select id="editprod-cat" class="form-field-control">
                <option value="Electrical Appliances" ${targetProduct.category === 'Electrical Appliances' ? 'selected' : ''}>Electrical Appliances</option>
                <option value="Mobile Devices & Computers" ${targetProduct.category === 'Mobile Devices & Computers' ? 'selected' : ''}>Mobile Devices & Computers</option>
                <option value="Home Furniture" ${targetProduct.category === 'Home Furniture' ? 'selected' : ''}>Home Furniture</option>
                <option value="Fashion Clothing Apparel" ${targetProduct.category === 'Fashion Clothing Apparel' ? 'selected' : ''}>Fashion Clothing Apparel</option>
                <option value="Others" ${targetProduct.category === 'Others' ? 'selected' : ''}>Others</option>
            </select>
        </div>
        
        <div class="form-input-container">
            <label>Primary Short Public Marketing Overview Description (Max 100 Chars):</label>
            <input type="text" id="editprod-info" class="form-field-control" maxlength="100" placeholder="Max 100 text characters" value="${targetProduct.info}">
        </div>
        
        <div class="form-input-container-image">
            <label>Update Product Image</label>
            <div class="preview-box" style="min-height: 100px; display: flex; align-items: center; justify-content: center; border: 1px dashed #ccc; margin-bottom: 10px;">
                <span id="placeholderTextimg" style="display: none;">No image selected</span>
                <img id="imagePreview" src="${targetProduct.coverPhoto}" alt="Image Preview" style="max-width: 100%; max-height: 200px; display: block;">
            </div>
            <input type="file" id="imageInput" accept="image/*">
        </div>
        <br>
        
        <div class="form-input-container">
            <label>More Info and Specifications</label>
            <textarea id="editprod-aiinfo" class="form-field-control rounded-rect" style="height:60px;" placeholder="A more detailed explanation of product.">${targetProduct.aiInfo}</textarea>
        </div>
        
        <div class="form-input-container">
            <label>Unit Commercial Pricing Valuation Baseline Quote Amount Number (${APP_STATE.currentUser.country === 'Nigeria' ? '₦' : '$'}):</label>
            <input type="number" id="editprod-price" class="form-field-control" placeholder="Enter numeric base rate" value="${targetProduct.price}">
        </div>
        
        <div class="btn-group margin-top-md">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Cancel Changes</button>
            <button onclick="executePipelineCommitUpdatedInventoryPostRecord('${targetProduct.pid}')" class="btn-blue">Save Changes</button>
        </div>
    `;

    // Re-use your existing live preview attachment engine
    setupImagePreviewListener();
    document.getElementById("auth-modal").classList.add("active");
}

function executePipelineCommitUpdatedInventoryPostRecord(targetProductIdKeyValueString) {
    const name = document.getElementById("editprod-name").value.trim();
    const cat = document.getElementById("editprod-cat").value;
    const info = document.getElementById("editprod-info").value.trim();
    const imagePreview = document.getElementById("imagePreview");
    const aiInfo = document.getElementById("editprod-aiinfo").value.trim();
    const priceRaw = document.getElementById("editprod-price").value;
    
    // Validation matches your upload criteria (image is already present via preview src)
    if(name === "" || info === "" || priceRaw === "" || !imagePreview.src || imagePreview.src === "") {
        alert("All compulsory info must be imputed.");
        return;
    }
    
    // Find the product location in your global app state array
    const productStructuralIndexMatchId = SYSTEM_DATABASE.products.findIndex(p => p.pid === targetProductIdKeyValueString);
    
    if(productStructuralIndexMatchId !== -1) {
        // Retain tracking configurations (pid, ownerUid, clickCount) while updating user fields
        SYSTEM_DATABASE.products[productStructuralIndexMatchId].name = name;
        SYSTEM_DATABASE.products[productStructuralIndexMatchId].category = cat;
        SYSTEM_DATABASE.products[productStructuralIndexMatchId].info = info;
        SYSTEM_DATABASE.products[productStructuralIndexMatchId].price = parseFloat(priceRaw);
        SYSTEM_DATABASE.products[productStructuralIndexMatchId].coverPhoto = imagePreview.src;
        SYSTEM_DATABASE.products[productStructuralIndexMatchId].aiInfo = aiInfo || "Standard platform baseline listed trading stock profile object reference specifications tracking structure model elements values data parameters.";
        
        // Persist database context states dynamically across modules
        syncPlatformDatabaseStateToWebStorage();
        
        closeActiveModalDirectly('auth-modal');
        alert("System Pipeline Core Notification Process Switch Event Alert: Product Details Updated Successfully.");
        
        // Refresh display instances live
        renderAccountInventoryLedgerManagementDashboardGrid();
        renderMarketplaceProductsDisplayLoop();
    } else {
        alert("Error mapping product tracking instance registry.");
    }
}

function executeDeletePlatformInventoryItemListingPostRecord(targetProductIdKeyValueString) {
    displayConfirmationModalOverlayAction("Are you completely certain you want to purge and remove this commercial product inventory listing data post completely from system clusters registers networks maps indexes?", () => {
        const structuralIndexMatchPointerId = SYSTEM_DATABASE.products.findIndex(p => p.pid === targetProductIdKeyValueString);
        if(structuralIndexMatchPointerId !== -1) {
            SYSTEM_DATABASE.products.splice(structuralIndexMatchPointerId, 1);
            syncPlatformDatabaseStateToWebStorage();
            renderAccountInventoryLedgerManagementDashboardGrid();
            renderMarketplaceProductsDisplayLoop();
        }
    });
}

/** Ratings Interactive Node Matrix Parameters Assignment Management Loop Routines Controllers Elements */
let LOCAL_INTERACTIVE_SESSION_STAR_RATING_SELECTION_SCORE_INTEGER = 0;
function setInteractiveStarScoreRating(selectedScoreInteger) {
    LOCAL_INTERACTIVE_SESSION_STAR_RATING_SELECTION_SCORE_INTEGER = selectedScoreInteger;
    const standardStarsSpanElementsCollectionNodes = document.getElementById("star-input-interactive-row").children;
    
    for(let idx = 0; idx < 5; idx++) {
        if(idx < selectedScoreInteger) {
             standardStarsSpanElementsCollectionNodes[idx].style.color = "#ffb300"; // highlighted operational golden amber color rating node status
        } else {
             standardStarsSpanElementsCollectionNodes[idx].style.color = "var(--fort-gray-border)";
        }
    }
}

function submitPlatformFeedbackToAdminChannel() {
    const feedbackNoteTextVal = document.getElementById("txt-feedback-input-box").value.trim();
    if(feedbackNoteTextVal === "" || LOCAL_INTERACTIVE_SESSION_STAR_RATING_SELECTION_SCORE_INTEGER === 0) {
        alert("Platform structural execution exception report error warning notice tracker: Input structural forms components fields values matrix columns maps arrays entries metrics checks mandates score ratings parameters assignment and non-blank narrative feedback logs entries values before pipeline validation processing runs loops controls.");
        return;
    }
    
    const operationalFeedbackReportFormPackagePayloadNode = {
        fid: "feedback_" + Date.now(),
        userUid: APP_STATE.currentUser ? APP_STATE.currentUser.uid : "anonymous_session_user_node",
        score: LOCAL_INTERACTIVE_SESSION_STAR_RATING_SELECTION_SCORE_INTEGER,
        note: feedbackNoteTextVal,
        timestamp: new Date().toISOString()
    };
    
    SYSTEM_DATABASE.platformFeedback.push(operationalFeedbackReportFormPackagePayloadNode);
    syncPlatformDatabaseStateToWebStorage();
    
    document.getElementById("txt-feedback-input-box").value = "";
    setInteractiveStarScoreRating(0);
    
    alert("System Administration Platform Channel Message Broadcast Response Gateway: Form framework telemetry package parsing evaluated, tracked, processed, compiled, and dispatched safely into admin monitoring arrays channels queues data blocks layers pipeline parameters models metrics values logs records indices.");
}

function openAdminAddSuiteSiteModal() {
    const modalTargetNode = document.getElementById("auth-modal-content");
    modalTargetNode.innerHTML = `
        <h3>[Privileged Admin Link Integration Switch Command Node Framework]</h3>
        <div class="form-input-container margin-top-sm">
            <label>Network Suite Platform Platform Entity Label Label Display Name:</label>
            <input type="text" id="adm-suite-name" class="form-field-control" placeholder="Enter entity system label name string text properties value">
        </div>
        <div class="form-input-container">
            <label>Network Suite Profile Core Operational Context Purpose Summary Note Narrative Block Properties Column:</label>
            <input type="text" id="adm-suite-info" class="form-field-control" placeholder="Brief descriptive metadata tracking framework alignment syntax values properties parameters">
        </div>
        <div class="form-input-container">
            <label>Uniform Resource Locator System Endpoint Routing Target Channel URL Link Address Syntax String Path Structure Context:</label>
            <input type="text" id="adm-suite-url" class="form-field-control" placeholder="https://example-suite-node.fort.net">
        </div>
        <div class="btn-group">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Discard Link Record</button>
            <button onclick="executeAdminPipelineSaveNewSuiteEntityLinkNodeRecordRowItem()" class="btn-blue">Publish Network Node Entity Link</button>
        </div>
    `;
    document.getElementById("auth-modal").classList.add("active");
}

function executeAdminPipelineSaveNewSuiteEntityLinkNodeRecordRowItem() {
    const name = document.getElementById("adm-suite-name").value.trim();
    const info = document.getElementById("adm-suite-info").value.trim();
    const url = document.getElementById("adm-suite-url").value.trim();
    
    if(name === "" || info === "" || url === "") {
        alert("Admin Exception Intercept Report Notification Error Trace Summary Log Warning Pointer Alert Struct: Missing tracking properties baseline parameters metrics columns items records matrix fields checks indices data values mapping configuration models rules parameters keys pointers elements.");
        return;
    }
    
    SYSTEM_DATABASE.networkSuiteEntities.push({ siteId: "s_" + Date.now(), logo: "", name: name, info: info, url: url });
    syncPlatformDatabaseStateToWebStorage();
    closeActiveModalDirectly('auth-modal');
    populateNetworkSuiteExtensionsDisplayView();
    alert("Admin Framework Master Ledger Synchronization Engine: Added entity block safely.");
}

/**
 * Privileged Platform System Monitoring Operations Analytics Calculation Metrics Control Module Subsystem
 */
function recalculateSystemAnalyticalMetricsSummary(selectedTimeframeContextStringValueWindowValueStringKey) {
    // Generate pseudo randomized tracking metrics numbers logs values profiles arrays shifts constrained safely checking filters
    const hoursLabelNode = document.getElementById("lbl-metric-hours");
    const topProdLabelNode = document.getElementById("lbl-metric-top-product");
    const topUserLabelNode = document.getElementById("lbl-metric-top-user");
    
    if(selectedTimeframeContextStringValueWindowValueStringKey === 'Today') {
        hoursLabelNode.innerText = "42 Hrs Active Session Execution Telemetry Logs";
        topProdLabelNode.innerText = "Smart OLED Television Set 4K Set Frame Array [ID: #p2]";
        topUserLabelNode.innerText = "Anonymous Client Broker Session Node Line Trace Vector Pointer #742";
    } else if(selectedTimeframeContextStringValueWindowValueStringKey === 'Yesterday') {
        hoursLabelNode.innerText = "94 Hrs Aggregated Cluster Session Close Log Execution Telemetry Logs";
        topProdLabelNode.innerText = "Premium Wireless Noise-Cancelling Headphones [ID: #p1]";
        topUserLabelNode.innerText = "Sarah Enterprise Hub (ID: #user_sarah)";
    } else {
        hoursLabelNode.innerText = "1,482 Hrs Total Active Running Service Infrastructure Analytics Logs Telemetry Parameters Matrix Units Metrics Data Profiles Elements Lines";
        topProdLabelNode.innerText = "Premium Wireless Noise-Cancelling Headphones System Inventory Component Log Baseline Registry Asset [ID: #p1]";
        topUserLabelNode.innerText = "Sarah Enterprise Hub Tracking Infrastructure Identity Master Accounting Ledger Profile Mapping Key Node Target Token Value Row #user_sarah Register Metrics Analysis";
    }
}

function executeFilteringSettingsContentPaneRowsNodesDisplay(searchQueryStringTextStringSyntaxPhrase) {
     const structuralSettingsPanelsElementsCollectionRowsArray = document.querySelectorAll(".settings-sub-panel div");
     structuralSettingsPanelsElementsCollectionRowsArray.forEach(nodeBlock => {
          if(nodeBlock.innerText.toLowerCase().includes(searchQueryStringTextStringSyntaxPhrase)) {
               nodeBlock.style.opacity = "1";
          } else {
               nodeBlock.style.opacity = "0.4"; // soft dimmer scaling to assist navigation discovery mapping indicators traces bounds
          }
     });
}

/**
 * Detailed Profile Presentation Context Overlay Summary Modal Processing Architecture Engine
 * Renders extended data layouts, business certificates, or metrics parameters for a given user profile.
 */
function launchDetailedUserProfileContextOverlaySummaryModal(userIdTokenKeyParameterValue) {
    const targetUserObjMatchRecord = SYSTEM_DATABASE.users.find(u => u.uid === userIdTokenKeyParameterValue || u.id === userIdTokenKeyParameterValue);
    if(!targetUserObjMatchRecord) return;
    const standardModalBodyElementNode = document.getElementById("product-detail-modal-body");
    if (!standardModalBodyElementNode) return;
    
    let subAccountClassificationMetadataDetailsBlockHTML = "";
    if(targetUserObjMatchRecord.accountType === 'business' || targetUserObjMatchRecord.type === 'business') {
         subAccountClassificationMetadataDetailsBlockHTML = `
             <div style="background-color:var(--fort-white-snow); padding:14px; border:1px solid var(--fort-gray-border);" class="rounded-rect margin-top-xs">
                 <h5 style="text-transform:uppercase; font-size:0.7rem; color:var(--fort-gray-slate); letter-spacing:0.5px;">User's Name and Info</h5>
                 <p style="font-size:0.95rem; font-weight:700; color:var(--fort-blue-dark); margin-top:4px;">${targetUserObjMatchRecord.businessName || ''}</p>
                 <p style="font-size:0.88rem; color:var(--fort-blue-primary); line-height:1.4; margin-top:4px;">${targetUserObjMatchRecord.businessInfo || ''}</p>
             </div> 
         `;
    } else {
         subAccountClassificationMetadataDetailsBlockHTML = `
             <div style="background-color:var(--fort-white-snow); padding:14px; border:1px solid var(--fort-gray-border);" class="rounded-rect margin-top-xs">
                 <h5 style="text-transform:uppercase; font-size:0.7rem; color:var(--fort-gray-slate); letter-spacing:0.5px;">User's Name and Info</h5>
                 <p style="font-size:0.95rem; font-weight:700; color:var(--fort-blue-dark); margin-top:4px;">${targetUserObjMatchRecord.identityName || targetUserObjMatchRecord.username || ''}</p>
             </div>
         `;
    }

    // --- INTEGRATION: INLINE ADMINISTRATIVE CONTROL LAYER ---
    let administrativeControlsInlineHTML = "";
    if (APP_STATE.currentUser && (APP_STATE.currentUser.uid === 'admin' || APP_STATE.currentUser.id === 'admin')) {
        const rawVerificationCode = targetUserObjMatchRecord.UserAccountAuthenticationVerificationCode || targetUserObjMatchRecord.verificationCode || 'N/A';
        const currentGovernanceStatus = targetUserObjMatchRecord.verificationStatus || targetUserObjMatchRecord.status || 'unverified';
        const currentAccountType = targetUserObjMatchRecord.accountType || targetUserObjMatchRecord.type || 'personal';
        const registrationContactIdentifier = targetUserObjMatchRecord.identifierText || '';
        const securityAccessPassword = targetUserObjMatchRecord.secretKey || targetUserObjMatchRecord.password || '';

        administrativeControlsInlineHTML = `
            <div style="margin-top:12px; margin-bottom:12px; padding:14px; background:#f7fafc; border:1px solid #cbd5e0; border-radius:8px; display:flex; flex-direction:column; gap:10px;">
                <h5 style="margin:0; text-transform:uppercase; font-size:0.75rem; color:var(--fort-gray-slate); letter-spacing:0.5px;">🛡️ Administrative Console Workspace</h5>
                
                <div style="display:flex; gap:8px;">
                    <div style="flex:1;">
                        <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">Registration Contact (Email / Phone):</span>
                        <input type="text" id="adm-user-identifier-text" class="form-field-control" style="margin-top:4px; font-family:monospace;" value="${registrationContactIdentifier}">
                    </div>
          
                    <div style="flex:1;">
                        <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">Account Password:</span>
                        <input type="text" id="adm-user-security-password" class="form-field-control" style="margin-top:4px; font-family:monospace;" value="${securityAccessPassword}">
                    </div>
                </div>

                <div>
                    <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">Account Signup Authentication Verification Code:</span>
                    <input type="text" id="UserAccountAuthenticationVerificationCode" class="form-field-control" style="margin-top:4px;" value="${rawVerificationCode}">
                </div>

                <div>
                    <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">Manage Account Type Privilege:</span>
                    <select id="adm-change-account-type" class="form-field-control" style="margin-top:4px;">
                        <option value="personal" ${currentAccountType === 'personal' ? 'selected' : ''}>Personal Account</option>
                        <option value="business" ${currentAccountType === 'business' ? 'selected' : ''}>Business (Commercial) Account</option>
                    </select>
                </div>

                <div style="font-size:0.82rem; color:var(--fort-blue-dark); margin-top:2px;">
                    Current Status Boundary: <strong id="lbl-inspector-active-status-tag" style="text-transform:uppercase; color:var(--fort-blue-primary);">${currentGovernanceStatus}</strong>
                </div>

                <div style="display:flex; gap:8px; margin-top:4px;">
                    <button type="button" class="btn-sm-pencil" style="flex:1; font-weight:700; padding:8px; cursor:pointer; text-transform:uppercase; font-size:0.75rem;" 
                        onclick="executeTriggerGovernanceStatusSelectionModal('${targetUserObjMatchRecord.uid || targetUserObjMatchRecord.id}')">
                        🔄 Change Status
                    </button>
                    <button type="button" class="btn-danger" style="padding:8px 12px; font-weight:700; font-size:0.75rem; text-transform:uppercase;" 
                        onclick="closeActiveModalDirectly('product-detail-modal'); executeAdminPurgeAccountCompletelyFromDatabase('${targetUserObjMatchRecord.uid || targetUserObjMatchRecord.id}')"
                        ${(targetUserObjMatchRecord.id === 'u1' || targetUserObjMatchRecord.uid === 'admin' || targetUserObjMatchRecord.id === 'admin') ? 'disabled' : ''}>
                        🗑️ Delete User
                    </button>
                </div>
                
                <button type="button" class="btn-blue" style="width:100%; padding:8px; font-weight:700; font-size:0.75rem; text-transform:uppercase; margin-top:2px;"
                    onclick="executeInlineAdminSave('${targetUserObjMatchRecord.uid || targetUserObjMatchRecord.id}')">
                    💾 Save Admin Changes
                </button>
            </div>
        `;
    }
    
    standardModalBodyElementNode.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:5px; text-align:left;">
            <div style="display:flex; align-items:center; gap:12px; padding-bottom:10px; border-bottom:1px solid var(--fort-gray-border);">
                 <img src="${targetUserObjMatchRecord.avatar || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23718096\'><path d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z\'/></svg>'}" style="width:55px; height:55px; object-fit:cover; border-radius:50%; border:2px solid var(--fort-blue-primary);" alt="User Avatar">
                 <div>
                     <h4 style="color:var(--fort-blue-dark); font-weight:800; font-size:1.15rem; margin:0;">${(targetUserObjMatchRecord.accountType === 'business' || targetUserObjMatchRecord.type === 'business') ? targetUserObjMatchRecord.businessName : (targetUserObjMatchRecord.identityName || targetUserObjMatchRecord.username)}</h4>
                     <p style="font-size:0.75rem; color:var(--fort-gray-slate); font-weight:600; text-transform:uppercase; margin-top:2px;">Classification Tier Status Signature: <span class="profile-mode-tag-label ${(targetUserObjMatchRecord.accountType === 'business' || targetUserObjMatchRecord.type === 'business') ? 'business' : 'personal'}">${targetUserObjMatchRecord.accountType || targetUserObjMatchRecord.type}</span></p>
                 </div>
            </div>
            
            <div class="margin-top-sm" style="display:flex; flex-direction:column; gap:8px;">
                 ${administrativeControlsInlineHTML}
                 <p style="font-size:0.85rem; color:var(--fort-gray-slate); font-weight:600; margin-top:2px;">Origin Country Routing Address Context: <span style="color:var(--fort-blue-dark);">${targetUserObjMatchRecord.country || 'N/A'} (${targetUserObjMatchRecord.dialingCode || ''})</span></p>
                 <p style="font-size:0.85rem; color:var(--fort-gray-slate); font-weight:600; margin-top:2px;">Platform Runtime Dynamic Network Presence Operational Baseline: <span style="color:var(--fort-green-check); font-weight:700;">Active Online Presence Parameter Baseline Sync Pulse Ready</span></p>
                 ${subAccountClassificationMetadataDetailsBlockHTML}
            </div>
            
            <div class="btn-group margin-top-md" style="justify-content:center;">
                 ${(APP_STATE.currentUser && APP_STATE.currentUser.uid !== targetUserObjMatchRecord.uid && APP_STATE.currentUser.id !== targetUserObjMatchRecord.uid) ? 
                    `<button class="btn-blue" onclick="closeActiveModalDirectly('product-detail-modal'); initialDirectMessageCommunicationPipelineSetup('${targetUserObjMatchRecord.uid || targetUserObjMatchRecord.id}')">💬 Message</button>` : ''
                 }
                <button class="btn-gray" onclick="closeActiveModalDirectly('product-detail-modal')">Leave</button>
            </div>
        </div>
    `;
    document.getElementById("product-detail-modal").classList.add("active");
}

/**
 * Commits administrative code alterations, status values, and account classification switches.
 */
function executeInlineAdminSave(userId) {
    const accountInstance = SYSTEM_DATABASE.users.find(u => u.id === userId || u.uid === userId);
    if (!accountInstance) return;

    // 1. Process status tracking strings
    const cachedStatusElement = document.getElementById("lbl-inspector-active-status-tag");
    const evaluatedStatusValue = cachedStatusElement && cachedStatusElement.getAttribute("data-pending-status-value") 
        ? cachedStatusElement.getAttribute("data-pending-status-value") 
        : (accountInstance.verificationStatus || accountInstance.status || 'unverified');

    accountInstance.verificationStatus = evaluatedStatusValue;
    accountInstance.status = evaluatedStatusValue;

    // 2. Process manual identifier Text updates (Email / Phone)
    const inputIdentifierField = document.getElementById("adm-user-identifier-text");
    if (inputIdentifierField) {
        const structuralIdentifierValue = inputIdentifierField.value.trim();
        accountInstance.identifierText = structuralIdentifierValue; // Keeps match properties intact
    }

    // 3. Process manual password updates
    const inputPasswordField = document.getElementById("adm-user-security-password");
    if (inputPasswordField) {
        const operationalPasswordValue = inputPasswordField.value.trim();
        accountInstance.secretKey = operationalPasswordValue;
        accountInstance.password = operationalPasswordValue; // Overwrite fallback keys matching design schema
    }

    // 4. Process manual code variables alterations
    const inputCodeField = document.getElementById("UserAccountAuthenticationVerificationCode");
    if(inputCodeField) {
        const boundValue = inputCodeField.value.trim();
        accountInstance.UserAccountAuthenticationVerificationCode = boundValue;
        accountInstance.verificationCode = boundValue;
    }

    // 5. Process account type change toggles
    const accountTypeSelectField = document.getElementById("adm-change-account-type");
    if(accountTypeSelectField) {
        const selectedType = accountTypeSelectField.value;
        accountInstance.accountType = selectedType;
        accountInstance.type = selectedType;
        
        if (selectedType === 'business') {
            if (!accountInstance.businessName) {
                accountInstance.businessName = accountInstance.identityName || accountInstance.username || "Corporate Entity";
            }
            if (!accountInstance.businessInfo) {
                accountInstance.businessInfo = "Commercial business distribution account profile workspace.";
            }
        }
    }

    // Sync modifications into web state storage containers
    if (typeof syncPlatformDatabaseStateToWebStorage === "function") {
        syncPlatformDatabaseStateToWebStorage();
    } else if (typeof commitDatabasesStateToLocalStorage === "function") {
        commitDatabasesStateToLocalStorage();
    }
    
    if (typeof renderAdminUsersManagementList === "function") {
        renderAdminUsersManagementList();
    }

    closeActiveModalDirectly("product-detail-modal");
    
    if (typeof showAlertModal === "function") {
        showAlertModal("Overwrites Saved", "Target credentials variables, account type matrices, and identity parameters permanently written to the registry.");
    } else {
        alert("Overwrites Saved successfully.");
    }
}


// Function to return to the root landing engine homepage cleanly
function returnToHome(event) {
    if (event) event.preventDefault(); // Stop default anchor jump loops
    
    // 1. Strip the custom subpath parameters and fallback to standard root directory context
    const homeUrl = window.location.origin + window.location.pathname.replace('fort mart index.html', '').replace('fortmart', '') + 'index.html';
    window.history.pushState({ page: 'home' }, 'Fort Developers', homeUrl);
    
    // 2. Head back to the main home portfolio surface screen safely
    window.location.href = 'index.html';
}

// Safeguard check for address bar modifications or direct access routing paste links
window.addEventListener('DOMContentLoaded', () => {
    // Ensure that if they hit the page directly, the URL context maintains visual formatting consistency
    if (!window.location.pathname.endsWith('fortmart') && window.location.pathname.includes('fort mart index.html')) {
        const structuralUrl = window.location.origin + window.location.pathname.replace('fort mart index.html', '') + 'fortmart';
        window.history.replaceState({ page: 'fortmart' }, 'Fort Mart - Marketplace & Chat', structuralUrl);
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