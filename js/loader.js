/*
============================================================
    LOADER MODULE
    Magical Birthday Website
============================================================
*/

export class Loader {

    constructor() {

        this.loader = document.getElementById("loader");

        this.progressBar = document.querySelector(".loader-bar");

        this.progressText = document.querySelector(".loader-text");

        this.hero = document.getElementById("hero");

        this.loading = 0;

        this.finished = false;

    }

    start() {

    if (!this.loader) return;

    this.animateBar();

}

    animateBar() {

        const messages = [

            "Preparing the stars... ✨",

            "Lighting the galaxy... 🌌",

            "Wrapping your surprise... 🎁",

            "Collecting happy memories... 💙",

            "Decorating the cake... 🎂",

            "Calling the fireworks... 🎆",

            "Almost Ready... ❤️"

        ];

        let messageIndex = 0;

        const interval = setInterval(() => {

            this.loading += Math.random() * 8;

            if (this.loading > 100) {

                this.loading = 100;

            }

            this.progressBar.style.width = `${this.loading}%`;

            if (messageIndex < messages.length && this.loading >= messageIndex * 15) {

                this.progressText.textContent = messages[messageIndex];

                messageIndex++;

            }

            if (this.loading >= 100) {

                clearInterval(interval);

                this.finished = true;

                setTimeout(() => {

                    this.finish();

                }, 600);

            }

        }, 120);

    }

    finish() {

    if (!this.loader) return;

    this.loader.style.opacity = "0";
    this.loader.style.pointerEvents = "none";

    setTimeout(() => {

        this.loader.remove();

        document.body.classList.remove("loading");
        document.body.classList.add("loaded");

        this.animateHero();

    }, 1000);

}

    animateHero() {

        if (!window.gsap) return;

        gsap.from(".hero-tag", {

            duration: 1,

            y: 50,

            opacity: 0,

            ease: "power3.out"

        });

        gsap.from(".hero-title", {

            duration: 1,

            y: 80,

            opacity: 0,

            delay: .3,

            ease: "power4.out"

        });

        gsap.from(".hero-name", {

            duration: 1.2,

            scale: .7,

            opacity: 0,

            delay: .7,

            ease: "back.out(1.8)"

        });

        gsap.from(".hero-subtitle", {

            duration: .8,

            opacity: 0,

            y: 30,

            delay: 1.2

        });

        gsap.from(".hero-description", {

            duration: .8,

            opacity: 0,

            y: 40,

            delay: 1.5

        });

        gsap.from("#beginJourney", {

            duration: .9,

            scale: .6,

            opacity: 0,

            delay: 1.8,

            ease: "elastic.out(1,0.5)"

        });

        gsap.from(".scroll-indicator", {

            duration: 1,

            opacity: 0,

            y: 20,

            delay: 2.2,

            repeat: -1,

            yoyo: true

        });

    }

}