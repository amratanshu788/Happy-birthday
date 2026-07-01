/*
==========================================================
    APP CONTROLLER
==========================================================
*/

import { CONFIG } from "./config.js";

import { Loader } from "./loader.js";
import { Galaxy } from "./galaxy.js";
import { MusicPlayer } from "./music.js";
import { Gift } from "./gift.js";
import { Story } from "./story.js";
import { Timeline } from "./timeline.js";
import { Typewriter } from "./typewriter.js";
import { Cake } from "./cake.js";
import { Fireworks } from "./fireworks.js";
import { Confetti } from "./confetti.js";
import { Utils } from "./utils.js";
import { Countdown } from "./countdown.js";
import { createCursor } from "./cursor.js";

/*==========================================================
    MAIN APPLICATION
==========================================================*/

class BirthdayApp {

    constructor() {

    this.loader = null;
    this.galaxy = null;
    this.music = null;
    this.gift = null;
    this.story = null;
    this.timeline = null;
    this.typewriter = null;
    this.cake = null;
    this.fireworks = null;
this.confetti = null;
this.countdown = null;
this.cursor = null;// <-- Add this

}

    init() {

    console.clear();

    console.log(
        `%c🎉 Happy Birthday ${CONFIG.birthdayPerson.name}!`,
        "font-size:20px;color:#ff4fa3;font-weight:bold;"
    );

    console.log("Utilities Loaded:", Utils);

    document.body.classList.add("loading");

    this.registerGSAP();

    this.initializeModules();

    this.registerGlobalEvents();

}

    registerGSAP() {

        if (window.gsap && window.ScrollToPlugin) {

            gsap.registerPlugin(ScrollToPlugin);

        }

    }

    initializeModules() {

    // Galaxy Background
    this.galaxy = new Galaxy();
    this.galaxy.init();

    // Loader Screen
    this.loader = new Loader();
    this.loader.start();

    // Background Music
    this.music = new MusicPlayer();
    this.music.init();

    // Gift Animation
    this.gift = new Gift(this.music);
    this.gift.init();

    // Story Section
    this.story = new Story();
    this.story.init();

    // Doctor Journey Timeline
    this.timeline = new Timeline();
    this.timeline.init();

    // Birthday Letter
    this.typewriter = new Typewriter();
    this.typewriter.init();

    // Birthday Cake
    this.cake = new Cake();
    this.cake.init();

    // Fireworks
    this.fireworks = new Fireworks();
    this.fireworks.init();

    // Confetti
    this.confetti = new Confetti();
    this.confetti.init();


    this.countdown = new Countdown();
    this.countdown.init();

    this.cursor = createCursor();

}
    registerGlobalEvents() {

        /* Smooth Anchor Scroll */

        document.querySelectorAll("a[href^='#']").forEach(link => {

            link.addEventListener("click", e => {

                e.preventDefault();

                const target = document.querySelector(

                    link.getAttribute("href")

                );

                if (!target) return;

                target.scrollIntoView({

                    behavior: "smooth"

                });

            });

        });

        /* Reveal Sections */

        const reveals = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                    }

                });

            },

            {

                threshold: .15

            }

        );

        reveals.forEach(item => observer.observe(item));

        /* Window Resize */

        window.addEventListener("resize", () => {

            document.documentElement.style.setProperty(

                "--vh",

                `${window.innerHeight * 0.01}px`

            );

        });

        /* Keyboard Shortcuts */

        document.addEventListener("keydown", e => {

            if (e.code === "Space") {

                e.preventDefault();

                if (this.music) {

                    this.music.toggle();

                }

            }

            if (e.key === "Escape") {

                const loader = document.getElementById("loader");

                if (loader) {

                    loader.style.display = "none";

                    document.body.style.overflow = "auto";

                }

            }

        });

        /* Celebration Event */

        document.addEventListener(

            "birthdayCelebration",

            () => {

                console.log("🎆 Celebration Started!");

            }

        );

    }

}

/*==========================================================
    START APP
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const app = new BirthdayApp();

        app.init();

    }

);