# Nifty Semantic Story Cleaner 📖

Tired of reading stories that look like they were formatted for a 1995 terminal? This Userscript transforms the "plain text" experience on Nifty into a modern, readable, and accessible format.

## ✨ Features

- **Semantic Refactoring**: Converts raw text into proper `<article>` and `<p>` tags.
- **Accessibility Boost**: Optimized for Android/iOS "Select to Speak" and screen readers (no more massive blue boxes!).
- **Smart Line-Break Fix**: Automatically detects and removes "hard" line breaks within paragraphs while preserving actual paragraph gaps.
- **Modern Typography**: Switches the font to `Georgia, serif` with optimized line height (1.78) for long-form reading.
- **Dark Mode Support**: Respects your system/browser dark mode settings automatically.
- **Full Width Layout**: Removes restrictive margins for a true edge-to-edge reading experience on mobile and desktop.

## 🚀 Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension for your browser.
2. Click the link below to install the script:
   - [**Install Nifty Clean-up Script**](https://raw.githubusercontent.com/LeHungryBoi/nifty-clean-up-js/main/nifty-clean-up.js)
3. Open any story on `nifty` and enjoy the new look!

## 🛠️ How it Works

The script intercepts the browser's default `<pre>` tag injection for `text/plain` content, parses the text using Regex to identify paragraph boundaries, and rebuilds the DOM from scratch using semantic HTML5 elements.

## 📝 License
MIT
