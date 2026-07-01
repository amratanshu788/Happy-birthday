/*
==========================================================
    COUNTDOWN MODULE
==========================================================
*/

import { CONFIG } from "./config.js";

export class Countdown {

    constructor() {

        this.container = document.getElementById("countdown");

        this.days = document.getElementById("days");

        this.hours = document.getElementById("hours");

        this.minutes = document.getElementById("minutes");

        this.seconds = document.getElementById("seconds");

        this.message = document.getElementById("countdownMessage");

        this.timer = null;

    }

    init() {

        if (!this.container) return;

        this.start();

    }

    start() {

        this.update();

        this.timer = setInterval(() => {

            this.update();

        },1000);

    }

    update() {

        const now = new Date();

let year = now.getFullYear();

let target = new Date(

    year,

    CONFIG.birthdayPerson.birthday.month - 1,

    CONFIG.birthdayPerson.birthday.day,

    0,

    0,

    0

);

if (now > target) {

    target = new Date(

        year + 1,

        CONFIG.birthdayPerson.birthday.month - 1,

        CONFIG.birthdayPerson.birthday.day,

        0,

        0,

        0

    );

}

        const now = new Date();

        const difference = target - now;

        if (difference <= 0) {

            clearInterval(this.timer);

            this.finish();

            return;

        }

        const day = Math.floor(difference / (1000 * 60 * 60 * 24));

        const hour = Math.floor(

            (difference % (1000 * 60 * 60 * 24)) /

            (1000 * 60 * 60)

        );

        const minute = Math.floor(

            (difference % (1000 * 60 * 60)) /

            (1000 * 60)

        );

        const second = Math.floor(

            (difference % (1000 * 60)) /

            1000

        );

        this.days.textContent = this.pad(day);

        this.hours.textContent = this.pad(hour);

        this.minutes.textContent = this.pad(minute);

        this.seconds.textContent = this.pad(second);

    }

    finish() {

        if (this.message) {

            this.message.innerHTML =

            "🎉 Happy Birthday Anjali! ❤️";

        }

        if(window.gsap){

            gsap.fromTo(

                "#countdown",

                {

                    scale:.8,

                    opacity:0

                },

                {

                    scale:1,

                    opacity:1,

                    duration:1

                }

            );

        }

        document.dispatchEvent(

            new CustomEvent("birthdayStarted")

        );

    }

    pad(value){

        return value.toString().padStart(2,"0");

    }

}