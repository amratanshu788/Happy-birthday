/*
==========================================================
    UTILS MODULE
==========================================================
*/

export class Utils {

    /*======================================================
        RANDOM NUMBER
    ======================================================*/

    static random(min, max) {

        return Math.random() * (max - min) + min;

    }

    static randomInt(min, max) {

        return Math.floor(

            Math.random() * (max - min + 1)

        ) + min;

    }

    /*======================================================
        RANDOM ARRAY ITEM
    ======================================================*/

    static randomItem(array) {

        return array[

            Math.floor(Math.random() * array.length)

        ];

    }

    /*======================================================
        CLAMP
    ======================================================*/

    static clamp(value, min, max) {

        return Math.min(

            Math.max(value, min),

            max

        );

    }

    /*======================================================
        LERP
    ======================================================*/

    static lerp(start, end, amount) {

        return start + (end - start) * amount;

    }

    /*======================================================
        DEBOUNCE
    ======================================================*/

    static debounce(callback, delay = 300) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    }

    /*======================================================
        THROTTLE
    ======================================================*/

    static throttle(callback, delay = 100) {

        let waiting = false;

        return (...args) => {

            if (waiting) return;

            callback(...args);

            waiting = true;

            setTimeout(() => {

                waiting = false;

            }, delay);

        };

    }

    /*======================================================
        SCROLL
    ======================================================*/

    static scrollTo(element) {

        if (!element) return;

        element.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

    /*======================================================
        FADE
    ======================================================*/

    static fadeIn(element) {

        if (!element) return;

        element.style.opacity = "0";

        element.style.display = "block";

        requestAnimationFrame(() => {

            element.style.transition = "opacity .6s";

            element.style.opacity = "1";

        });

    }

    static fadeOut(element) {

        if (!element) return;

        element.style.transition = "opacity .6s";

        element.style.opacity = "0";

        setTimeout(() => {

            element.style.display = "none";

        }, 600);

    }

    /*======================================================
        STORAGE
    ======================================================*/

    static save(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }

    static load(key) {

        const value = localStorage.getItem(key);

        if (!value) return null;

        return JSON.parse(value);

    }

    static remove(key) {

        localStorage.removeItem(key);

    }

    /*======================================================
        DEVICE
    ======================================================*/

    static isMobile() {

        return window.innerWidth <= 768;

    }

    static isTouch() {

        return (

            "ontouchstart" in window ||

            navigator.maxTouchPoints > 0

        );

    }

    /*======================================================
        ELEMENT
    ======================================================*/

    static create(tag, className = "") {

        const element = document.createElement(tag);

        if (className) {

            element.className = className;

        }

        return element;

    }

    static remove(element) {

        if (element && element.parentNode) {

            element.parentNode.removeChild(element);

        }

    }

    /*======================================================
        WAIT
    ======================================================*/

    static wait(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

    /*======================================================
        FORMAT TIME
    ======================================================*/

    static formatNumber(value) {

        return value.toString().padStart(2, "0");

    }

    /*======================================================
        VIEWPORT
    ======================================================*/

    static inViewport(element) {

        const rect = element.getBoundingClientRect();

        return (

            rect.top < window.innerHeight &&

            rect.bottom > 0

        );

    }

}