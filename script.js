document.addEventListener("DOMContentLoaded", () => {
    console.log("Website is ready!");

    // Smooth scrolling for links (if there are any internal anchor links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });

    // Subscription button logic for each item
    const subscriptionButtons = document.querySelectorAll(".subscription-options button");

    subscriptionButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove the "active" class from all buttons within the same subscription-options group
            const siblingButtons = button.parentElement.querySelectorAll("button");
            siblingButtons.forEach(btn => btn.classList.remove("active"));

            // Add the "active" class to the clicked button
            button.classList.add("active");

            // Extract the frequency and item details
            const frequency = button.dataset.frequency;
            const itemName = button.closest(".item-card").querySelector("h4").textContent;

            // Display the selected subscription option in the console
            console.log(`Selected ${frequency} subscription for ${itemName}`);
        });
    });

    // Contact Form Handling (with dynamic feedback)
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Simulating success or error response
            const success = true; // Replace this with actual server-side response handling

            const feedback = document.getElementById("form-feedback");
            if (feedback) {
                if (success) {
                    feedback.textContent = "Bedankt voor je bericht! We nemen spoedig contact met je op.";
                    feedback.className = "success";
                } else {
                    feedback.textContent = "Oeps! Er ging iets mis. Probeer het opnieuw.";
                    feedback.className = "error";
                }

                // Show feedback and hide after 5 seconds
                feedback.style.display = "block";
                setTimeout(() => {
                    feedback.style.display = "none";
                }, 5000);
            }

            // Reset form if successful
            if (success) {
                contactForm.reset();
            }
        });
    }

    console.log("JavaScript setup complete.");
});

// JavaScript for Search and Cart Functionality

// Sample product data for search functionality
const products = [
    { name: 'Product 1', description: 'Description of Product 1' },
    { name: 'Product 2', description: 'Description of Product 2' },
    // Add more products as needed
];

// Function to handle product search
function searchProducts() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const results = products.filter(product => product.name.toLowerCase().includes(query));
    // Display search results (implement as needed)
    console.log('Search Results:', results);
}

// Cart functionality
let cart = [];

// Function to add items to the cart
function addToCart(productName) {
    // Check if the product is already in the cart
    const itemIndex = cart.findIndex(item => item.name === productName);
    if (itemIndex > -1) {
        // Increase quantity if the item exists
        cart[itemIndex].quantity += 1;
    } else {
        // Add new item if it doesn't exist
        cart.push({ name: productName, quantity: 1 });
    }
    updateCartCount();
    console.log(`${productName} added to cart.`);
}

// Function to update the cart item count display
function updateCartCount() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.innerText = itemCount;
    }
}

// Function to toggle cart visibility
function toggleCart() {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
        cartElement.classList.toggle('hidden');
        displayCartItems();
    }
}

// Function to display items in the cart
function displayCartItems() {
    const cartItemsElement = document.getElementById('cartItems');
    if (cartItemsElement) {
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} (x${item.quantity})`;
            cartItemsElement.appendChild(listItem);
        });
    }
}

// Dropdown Language Selector
document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('languageDropdown');
    const dropdownMenu = dropdownToggle.nextElementSibling;
    const navItem = dropdownToggle.parentElement;

    dropdownToggle.addEventListener('click', function () {
        const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
        dropdownToggle.setAttribute('aria-expanded', !isExpanded);
        navItem.classList.toggle('show');
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            const selectedFlag = this.querySelector('.flag-icon').src;
            const selectedText = this.textContent.trim();

            // Update the button to reflect the selected language
            dropdownToggle.querySelector('.flag-icon').src = selectedFlag;
            dropdownToggle.querySelector('span').textContent = selectedText;

            // Close the dropdown
            dropdownToggle.setAttribute('aria-expanded', false);
            navItem.classList.remove('show');

            // Implement your language switching logic here
            switchLanguage(selectedLang);
        });
    });

    // Load the selected language from localStorage (if any)
    const savedLang = localStorage.getItem('selectedLang') || 'nl'; // Default to 'nl' if no language is set
    switchLanguage(savedLang);

    // Update the dropdown to reflect the saved language
    const selectedLang = savedLang === 'nl' ? 'Nederlands' : 'English';
    const flagIcon = savedLang === 'nl'
        ? 'https://cdn4.iconfinder.com/data/icons/world-flags/180/flag_netherland-1024.png'
        : 'https://static.vecteezy.com/system/resources/previews/005/416/914/original/flag-of-united-kingdom-illustration-free-vector.jpg';

    dropdownToggle.querySelector('.flag-icon').src = flagIcon;
    dropdownToggle.querySelector('span').textContent = selectedLang;
});

// Language translations for the entire page
const translations = {
    en: {
        pageTitle: "Personalized Subscriptions",
        tagline: "All your essentials, wherever and whenever you want.",
        ctaButton: "Discover More",
        aboutTitle: "Welcome to Our Personalized Subscriptions",
        aboutText: "We deliver carefully curated everyday essentials directly to your home. From premium cleaning products to sustainable care items, we make sure you never run out.",
        aboutText2: "At Personalized Subscriptions, we believe your time is valuable. That's why we curate everyday essentials and deliver them straight to your door. Whether it's cleaning products, toiletries, makeup, or daily essentials, our service is tailored to your needs and delivered on a schedule that works for you.",
        feature1Title: "Personalized Service",
        feature1Text: "Customizable boxes tailored to your preferences and lifestyle.",
        feature2Title: "Sustainability",
        feature2Text: "Choose environmentally friendly and high-quality products.",
        feature3Title: "Convenience",
        feature3Text: "Delivery options tailored to your schedule!",
        productsTitle: "Popular Products",
        footerText: "&copy; 2024 Personalized Subscriptions. All rights reserved."
    },
    nl: {
        pageTitle: "Gepersonaliseerde Abonnementen",
        tagline: "Al uw benodigdheden, waar en wanneer u wilt.",
        ctaButton: "Ontdek Meer",
        aboutTitle: "Welkom bij onze Gepersonaliseerde Abonnementen",
        aboutText: "Wij leveren zorgvuldig samengestelde alledaagse benodigdheden rechtstreeks bij jou thuis. Van premium schoonmaakartikelen tot duurzame verzorgingsproducten, wij zorgen dat je nooit misgrijpt.",
        aboutText2: "Bij Gepersonaliseerde Abonnementen geloven we dat jouw tijd kostbaar is. Daarom stellen we zorgvuldig alledaagse benodigdheden samen en bezorgen we ze rechtstreeks bij jou aan de deur. Of het nu gaat om schoonmaakproducten, toiletartikelen, make-up of dagelijkse benodigdheden, onze service is afgestemd op jouw behoeften en geleverd volgens een schema dat bij jou past.",
        feature1Title: "Persoonlijke Service",
        feature1Text: "Aanpasbare boxen afgestemd op jouw voorkeuren en levensstijl.",
        feature2Title: "Duurzaamheid",
        feature2Text: "Kies voor milieuvriendelijke en hoogwaardige producten.",
        feature3Title: "Gemak",
        feature3Text: "Bezorgopties afgestemd op jouw schema!",
        productsTitle: "Populaire Producten",
        footerText: "&copy; 2024 Gepersonaliseerde Abonnementen. Alle rechten voorbehouden."
    }
};

// Function to switch content based on selected language for the entire page
function switchLanguage(lang) {
    // Store selected language in localStorage
    localStorage.setItem("selectedLang", lang);

    // Apply translations for the entire page
    document.getElementById("page-title").textContent = translations[lang].pageTitle;
    document.getElementById("tagline").textContent = translations[lang].tagline;
    document.getElementById("cta-button").textContent = translations[lang].ctaButton;
    document.getElementById("about-title").textContent = translations[lang].aboutTitle;
    document.getElementById("about-text").textContent = translations[lang].aboutText;
    document.getElementById("about-text-2").textContent = translations[lang].aboutText2;
    document.getElementById("feature-1-title").textContent = translations[lang].feature1Title;
    document.getElementById("feature-1-text").textContent = translations[lang].feature1Text;
    document.getElementById("feature-2-title").textContent = translations[lang].feature2Title;
    document.getElementById("feature-2-text").textContent = translations[lang].feature2Text;
    document.getElementById("feature-3-title").textContent = translations[lang].feature3Title;
    document.getElementById("feature-3-text").textContent = translations[lang].feature3Text;
    document.getElementById("products-title").textContent = translations[lang].productsTitle;
    document.getElementById("footer-text").innerHTML = translations[lang].footerText;

    // Update categories separately (handling category names like "Schoonmaak" or "Cleaning")
    updateCategoryNames(lang);

    // Update dropdown
    const selectedLangText = lang === 'nl' ? 'Nederlands' : 'English';
    const flagIcon = lang === 'nl'
        ? 'https://cdn4.iconfinder.com/data/icons/world-flags/180/flag_netherland-1024.png'
        : 'https://static.vecteezy.com/system/resources/previews/005/416/914/original/flag-of-united-kingdom-illustration-free-vector.jpg';

    const dropdownToggle = document.getElementById('languageDropdown');
    dropdownToggle.querySelector('.flag-icon').src = flagIcon;
    dropdownToggle.querySelector('span').textContent = selectedLangText;
}

// Update category names based on language
function updateCategoryNames(lang) {
    const cleaningCategory = document.getElementById('cleaning-category');
    
    if (lang === 'nl') {
        cleaningCategory.textContent = 'Schoonmaak';  // Dutch
    } else {
        cleaningCategory.textContent = 'Cleaning';  // English
    }
}

// Apply language on page load
window.onload = function() {
    const savedLang = localStorage.getItem("selectedLang") || "nl";
    switchLanguage(savedLang);
};

// Add functionality to the login form
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Please fill out both fields.');
        return;
    }

    // Simulate login process
    if (username === 'demo' && password === 'demo') {
        alert('Login successful!');
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
        alert('Invalid username or password.');
    }
});
