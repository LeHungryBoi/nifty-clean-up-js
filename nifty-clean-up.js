// ==UserScript==
// @name         Nifty.org - Semantic Story Cleaner
// @namespace    https://github.com/LeHungryBoi/nifty-clean-up-js
// @version      3.5
// @description  Removes fake line breaks, wraps paragraphs in <p> tags, and adds responsive padding.
// @author       LeHungryBoi
// @match        https://www.nifty.org/nifty/*
// @match        https://nifty.org/nifty/*
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/LeHungryBoi/nifty-clean-up-js/main/nifty-clean-up.js
// @downloadURL  https://raw.githubusercontent.com/LeHungryBoi/nifty-clean-up-js/main/nifty-clean-up.js
// ==/UserScript==

(function () {
    'use strict';

    function isStoryPage() {
        const hasPre = !!document.querySelector('pre');
        const hasTableStuff = document.querySelectorAll('tr, td').length > 0;
        return hasPre && !hasTableStuff;
    }

    if (isStoryPage()) {
        console.log('✅ Story page detected — fixing text');
        const pre = document.querySelector('pre');
        if (!pre) return;

        let text = pre.textContent;
        // Fix hard returns while keeping double-newlines
        text = text.replace(/(\S)\n(\S)/g, '$1 $2');
        text = text.replace(/ +/g, ' ');

        const paragraphBlocks = text.split(/\n{2,}/);
        const article = document.createElement('article');
        article.id = 'story-content';

        paragraphBlocks.forEach(block => {
            const trimmed = block.trim();
            if (trimmed.length > 0) {
                const p = document.createElement('p');
                p.textContent = trimmed;
                article.appendChild(p);
            }
        });

        pre.parentNode.replaceChild(article, pre);
        console.log(`✅ Text refactored: ${paragraphBlocks.length} paragraphs.`);
    }

    const style = document.createElement('style');
    style.textContent = `
        html, body {
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            box-sizing: border-box !important;
            font-size: 1.1em !important;
            line-height: 1.78 !important;
            font-family: Georgia, serif !important;
            /* 默认手机端：极窄边距 */
            padding: 4px 4px !important; 
        }

        article#story-content {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
        }

        p {
            margin-bottom: 1.6em !important;
            display: block !important;
        }

        /* 针对桌面端或宽屏：恢复更舒适的边距 */
        @media (min-width: 768px) {
            html, body {
                padding: 20px 30px !important;
            }
        }

        @media (prefers-color-scheme: dark) {
            html, body {
                background-color: #121212 !important;
                color: #e0e0e0 !important;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Nifty script v3.4 (Mobile Padding Optimized) loaded');
})();
