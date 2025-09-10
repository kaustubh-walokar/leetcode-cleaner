// ==UserScript==
// @name         AlgoMonster Banner Hider
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description Hide/show the top banner on AlgoMonster pages with a toggle button
// @author       You
// @match        https://algo.monster/*
// @grant        none
// @homepageURL     https://github.com/kaustubh-walokar/leetcode-cleaner
// @downloadURL  https://raw.githubusercontent.com/kaustubh-walokar/leetcode-cleaner/mainline/algo-monster-banner-hider.user.js
// @updateURL    https://raw.githubusercontent.com/kaustubh-walokar/leetcode-cleaner/mainline/algo-monster-banner-hider.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Configuration constants - easily customizable
    // These can be modified to change the appearance and behavior of the script
    const CONFIG = {
        // Emoji icons for button states
        EMOJI_VISIBLE: '🫥',  // Emoji when banner is visible
        EMOJI_HIDDEN: '😶‍🌫️',   // Emoji when banner is hidden
        BUTTON_BG_COLOR: 'rgba(76, 149, 175, 0.01)',
        BUTTON_HOVER_COLOR: '#457da0ff',
        BUTTON_TEXT_COLOR: 'white',
        BUTTON_SIZE: '10px',
        BUTTON_PADDING: '5px 7px',
        BUTTON_MARGIN: '5px',
        BUTTON_BORDER_RADIUS: '2px',
        BUTTON_SHADOW: '0 2px 4px rgba(0,0,0,0.2)',
        BUTTON_Z_INDEX: '100000'
    };

    // Create toggle button for banner
    function createToggleButton() {
        // Check if button already exists to avoid duplicates
        if (document.getElementById('banner-toggle-btn')) {
            return;
        }

        // Create the toggle button element
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'banner-toggle-btn';
        toggleBtn.textContent = CONFIG.EMOJI_VISIBLE; // Emoji for the button
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '0';
        toggleBtn.style.right = '0';
        toggleBtn.style.zIndex = CONFIG.BUTTON_Z_INDEX;
        toggleBtn.style.backgroundColor = CONFIG.BUTTON_BG_COLOR;
        toggleBtn.style.color = CONFIG.BUTTON_TEXT_COLOR;
        toggleBtn.style.border = 'none';
        toggleBtn.style.padding = CONFIG.BUTTON_PADDING;
        toggleBtn.style.margin = CONFIG.BUTTON_MARGIN;
        toggleBtn.style.borderRadius = CONFIG.BUTTON_BORDER_RADIUS;
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.fontSize = CONFIG.BUTTON_SIZE;
        toggleBtn.style.boxShadow = CONFIG.BUTTON_SHADOW;
        toggleBtn.style.transition = 'all 0.3s ease';
        toggleBtn.style.fontFamily = 'Arial, sans-serif';
        toggleBtn.style.display = 'flex';
        toggleBtn.style.alignItems = 'center';
        toggleBtn.style.justifyContent = 'center';
        
        // Add hover effect
        toggleBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = CONFIG.BUTTON_HOVER_COLOR;
            this.style.transform = 'scale(1.1)';
        });
        
        toggleBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = CONFIG.BUTTON_BG_COLOR;
            this.style.transform = 'scale(1)';
        });
        
        // Add click handler to toggle banner
        toggleBtn.addEventListener('click', function() {
            toggleBanner();
        });
        
        // Add button to the page
        document.body.appendChild(toggleBtn);
    }

    // Function to find and toggle banner visibility
    function toggleBanner() {
        // Find the banner element - we'll try to identify common patterns
        let banner = null;
        
        // Try to find the header or top navigation bar with specific selectors
        const headers = document.querySelectorAll('header, .navbar, .top-bar, nav');
        for (let i = 0; i < headers.length; i++) {
            const rect = headers[i].getBoundingClientRect();
            if (rect.top <= 50) {
                banner = headers[i];
                break;
            }
        }
        
        // If no header found, look for elements near the top that are likely banners
        if (!banner) {
            const elements = document.querySelectorAll('*');
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const rect = element.getBoundingClientRect();
                // Check if element is near the top and has banner-like characteristics
                if (rect.top <= 50 &&
                    (element.tagName === 'HEADER' ||
                     element.classList.contains('banner') ||
                     element.classList.contains('navbar') ||
                     element.classList.contains('top-bar') ||
                     element.id === 'app' || // Common wrapper for AlgoMonster pages
                     element.classList.contains('app') ||
                     element.classList.contains('algomonster-header') || // AlgoMonster specific class
                     element.classList.contains('top-nav') ||
                     (element.textContent &&
                      (element.textContent.includes('AlgoMonster') ||
                       element.textContent.includes('Explore') ||
                       element.textContent.includes('Problems') ||
                       element.textContent.includes('Courses') ||
                       element.textContent.includes('Interview Prep'))))) {
                    banner = element;
                    break;
                }
            }
        }

        // If still no banner found, try to find elements with "Login", "Account" or logo text
        if (!banner) {
            const elements = document.querySelectorAll('*');
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const rect = element.getBoundingClientRect();
                if (rect.top <= 50) {
                    const text = element.textContent || '';
                    if (text.includes('Login') ||
                        text.includes('Sign In') ||
                        text.includes('Account') ||
                        element.querySelector('img') !== null) {
                        banner = element;
                        break;
                    }
                }
            }
        }

        // Additional specific selectors for AlgoMonster elements
        if (!banner) {
            // Try to find the main navigation bar or top container
            const algomonsterSelectors = [
                '[class*="header"]',
                '[class*="topbar"]',
                '[class*="navigation"]',
                '.main-header',
                '#header',
                '.top-nav-container'
            ];
            
            for (const selector of algomonsterSelectors) {
                const element = document.querySelector(selector);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 50) {
                        banner = element;
                        break;
                    }
                }
            }
        }

        // If we found a banner, toggle its visibility
        if (banner) {
            // Store the original state in a data attribute to avoid conflicts
            const isHidden = banner.style.display === 'none';
            
            // Toggle the banner visibility
            if (isHidden) {
                banner.style.display = '';
                // If it was previously hidden with transform, reset to default
                banner.style.transform = '';
            } else {
                banner.style.display = 'none';
            }
            
            // Update button text to reflect current state
            const toggleBtn = document.getElementById('banner-toggle-btn');
            if (toggleBtn) {
                // Change emoji based on current state
                toggleBtn.textContent = isHidden ? CONFIG.EMOJI_VISIBLE : CONFIG.EMOJI_HIDDEN;
            }
        }
    }

    // Initialize the script
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                createToggleButton();
            });
        } else {
            createToggleButton();
        }
        
        // Also try to find and hide banners immediately
        setTimeout(function() {
            const banners = document.querySelectorAll('header, .navbar, .top-bar, nav');
            banners.forEach(banner => {
                const rect = banner.getBoundingClientRect();
                if (rect.top <= 50) {
                    banner.style.display = 'none';
                }
            });
        }, 100);
        
        // Additional immediate hiding for AlgoMonster specific elements
        setTimeout(function() {
            const algomonsterElements = document.querySelectorAll(
                '[class*="header"], [class*="topbar"], .main-header, #header'
            );
            algomonsterElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 50) {
                    element.style.display = 'none';
                }
            });
        }, 200);
    }

    // Run the initialization
    init();
})();