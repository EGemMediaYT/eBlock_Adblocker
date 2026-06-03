// ==UserScript==
// @name         eBlock Adblocker
// @license      MIT
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  eBlock (or EADB) blocks all ads at no cost! Easily get rid of ads without any problems.
// @author       EGem
// @match        *
// @icon         https://creator-cdn.icons8.com/Zk_F2wJ5AOKELUqkPHqkg6gZRBP1hY-GH6gIs0xVNQE/rs:fit:200:200/czM6Ly9yMi1pY29u/czgtY3JlYXRvci1w/cm9kL2Fzc2V0cy9l/ZGl0b3IvdXBsb2Fk/cy84OTEvNjI3M2Nk/N2UtYmFjOS00NjEw/LWE1NDQtNDRjZGNj/MTM0MDg1LnN2Zw.png
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const site = window.location.hostname;

    let adSelectors = [];

    switch (site) {
        default:
            adSelectors = ['.top-banner', '#side-ads'];
            break;
    }

    adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
    });
})();

document.getElementById('ads').style.display = 'none';

class AdBlocker {
    constructor(domain) {
        this.domain = domain;
    }

    block() {
        if (this.domain.includes === '.') {
            document.querySelector('.ad-box')?.remove();
        }
    }
}

const blocker = new AdBlocker(window.location.hostname);
blocker.block();

const originalFetch = window.fetch;

window.fetch = async function(...args) {
    const url = args[0];
    
    if (typeof url === 'string') {
        switch (true) {
            case url.includes('doubleclick.net'):
            case url.includes('google-analytics.com'):
            case url.includes('/ads/loader.js'):
            case url.includes('.'):
            case url.includes('*'):
            case url.includes(':'):
                console.log('ad blocked at:', url);
                return new Response('', { status: 204 });
        }
    }
    
    return originalFetch.apply(this, args);
};
