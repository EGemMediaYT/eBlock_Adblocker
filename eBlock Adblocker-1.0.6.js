// ==UserScript==
// @name         eBlock Adblocker
// @license      MIT
// @namespace    https://tampermonkey.net/
// @version      1.0.6
// @description  eBlock (or EADB) blocks all ads at no cost! Easily get rid of ads without any problems.
// @author       EGem
// @match        *
// @icon         https://shorturl.at/BCXFz
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

// The FBI recommends an ad-blocker for your privacy.

// ==CHANGELOG==
// 1.0 - Initial release
// 1.0.5 - First working release
// 1.0.6 - Added extra code, fixed some bugs
// ==/CHANGELOG==

(function() {
    'use strict';
    
    let sites = {
        '*': {
            click: ['.class','#element'],
            remove: ['.ad','#banner'],
            interaction: true,
            timeout: 0,
            interval: 0,
            background: '#ffffff'
        },
    }

    let interval = null;

    let hostname = document.location.hostname;

    function cleanup() {

        if(sites[hostname].interaction) {
            document.body.dispatchEvent(new MouseEvent('mousemove'));
        }

        if(sites[hostname].remove) {
            let selectors = sites[hostname].remove;

            selectors.forEach(function(selector) {
                let elements = document.querySelectorAll(selector);

                console.log(selector, elements);

                elements.forEach(function(elem) {
                    elem.style.visibility = 'hidden';
                    elem.style.width = '1px';
                    elem.style.height = '1px';
                    elem.style.overflow = 'hidden';
                    elem.style.opacity = 0;
                });
            });
        }

        if(sites[hostname].background) {
            document.body.style.background = sites[hostname].background;
            document.body.style.overflow = 'scroll';
            document.body.style.position = 'static';
        }

        if(sites[hostname].click) {
            let selectors = sites[hostname].click;

            selectors.forEach(function(selector) {
                let element = document.querySelector(selector);

                if(element !== null) {
                    element.click();
                }
            });
        }
    }

    if(Object.keys(sites).indexOf(hostname) >= 0) {

        let timeout = 0;
        if(sites[hostname].timeout) {
            timeout = sites[hostname].timeout;
        }

        window.setTimeout(function(){
            cleanup();
        }, timeout);

        if(sites[hostname].interval) {
            if(interval === null) {
                interval = window.setInterval(function(){
                    cleanup();
                }, sites[hostname].interval);
            }
        }
    }
})();

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

document.getElementById('ads').style.display = 'none';

class adblockdbi {
    constructor(domain) {
        this.domain = domain;
    }

    block() {
        if (this.domain.includes === '.') {
            document.querySelector('.ad-box')?.remove();
        }
    }
}

(function removeAdvertisementAndBlockingElements () {
    ('.inRek').remove();
    ('.mgbox').remove();

    Array.from(document.getElementsByTagName("img")).forEach(function (e) {
        if (!e.src.includes(window.location.host)) {
            e.remove()
        }
    });

    Array.from(document.getElementsByTagName("div")).forEach(function (e) {
        var currentZIndex = parseInt(document.defaultView.getComputedStyle(e, null).zIndex);
        if (currentZIndex > 999) {
            console.log(parseInt(currentZIndex));
            e.remove()
        }
    });
})();

const blockdb = new adblockdbi(window.location.hostname);
blockdb.block();

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
