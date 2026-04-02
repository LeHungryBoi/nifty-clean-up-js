// ==UserScript==
// @name         Nifty.org - Semantic Story Cleaner
// @namespace    https://github.com/LeHungryBoi/nifty-clean-up-js
// @version      3.6
// @description  Mobile-optimized font sizes, responsive padding, and semantic refactoring.
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
            /* 移动端默认字号调小 */
            font-size: 1rem !important; 
            line-height: 1.65 !important;
            font-family: Georgia, serif !important;
            padding: 8px 2px !important; 
            -webkit-text-size-adjust: 100%; /* 防止 iOS 自动放大字体 */
        }

        article#story-content {
            width: 100%;
            max-width: 850px; /* 稍微收窄一点，增加阅读沉浸感 */
            margin: 0 auto;
        }

        p {
            margin-bottom: 1.4em !important;
            display: block !important;
        }

        /* 桌面端/大屏幕：字号稍微加大，增加边距 */
        @media (min-width: 768px) {
            html, body {
                font-size: 1.12rem !important;
                line-height: 1.8 !important;
                padding: 20px 40px !important;
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
    console.log('✅ Nifty script v3.5 (Font & Padding Optimized) loaded');
})();
