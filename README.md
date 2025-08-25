# LeetCode Banner Hider

A Tampermonkey userscript that allows you to hide and show the top banner on LeetCode pages with a simple emoji button.

## Features

- **Toggle Button**: Easily hide/show the banner with an emoji button in the top-right corner
- **Customizable**: Change emojis, colors, and styling through configuration options
- **Automatic Detection**: Works on all LeetCode pages to find and hide banners
- **GitHub Ready**: Properly configured for GitHub publishing with update URLs

## Installation

### Using Tampermonkey Extension:

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Visit the [raw script file](https://raw.githubusercontent.com/kaustubh-walokar/leetcode-cleaner/main/leetcode-banner-hider.user.js) in your browser
3. Click "Install" when prompted

### Manual Installation:

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Create a new userscript in Tampermonkey
3. Copy and paste the contents of `leetcode-banner-hider.user.js` into the new script
4. Save and enable the script

## How It Works

The script adds a toggle button (currently 🫥/😶‍🌫️) to the top-right corner of LeetCode pages. When you click it:

1. If the banner is visible, it will be hidden
2. If the banner is hidden, it will be shown again

The button changes emojis to indicate its current state:
- 🫥: Banner is currently visible
- 😶‍🌫️: Banner is currently hidden


## GitHub Repository

- **Repository**: [kaustubh-walokar/leetcode-cleaner](https://github.com/kaustubh-walokar/leetcode-cleaner)
- **Download URL**: https://raw.githubusercontent.com/kaustubh-walokar/leetcode-cleaner/main/leetcode-banner-hider.user.js
- **Update URL**: https://raw.githubusercontent.com/kaustubh-walokar/leetcode-cleaner/main/leetcode-banner-hider.user.js

## Supported LeetCode Pages
- Any other LeetCode page (the script matches all `https://leetcode.com/*` URLs)

## Requirements

- [Tampermonkey](https://www.tampermonkey.net/) browser extension
- Modern web browser (Chrome, Firefox, Edge, etc.)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Kaustubh Walokar

---

*This userscript is designed to enhance the LeetCode user experience by allowing you to hide distracting banners and focus on coding challenges.*
