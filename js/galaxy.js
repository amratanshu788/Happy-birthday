/*
==========================================================
    GALAXY MODULE
    Magical Birthday Website
==========================================================
*/

export class Galaxy {

    constructor() {

        this.starContainer = document.getElementById("stars");
        this.heartContainer = document.getElementById("floatingHearts");
        this.flowerContainer = document.getElementById("floatingFlowers");

        this.canvas = document.getElementById("meteorCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.meteors = [];

        this.resize();

        window.addEventListener("resize", () => this.resize());

    }

    init() {

        this.createStars(350);

        this.createFlowers(25);

        this.createHearts(18);

        this.createMeteorLoop();

        this.animate();

    }

    resize() {

        this.canvas.width = window.innerWidth;

        this.canvas.height = window.innerHeight;

    }

    /*====================================================
        STARS
    ====================================================*/

    createStars(count) {

        this.starContainer.innerHTML = "";

        for (let i = 0; i < count; i++) {

            const star = document.createElement("div");

            star.className = "star";

            star.style.left = Math.random() * 100 + "%";

            star.style.top = Math.random() * 100 + "%";

            star.style.animationDelay = Math.random() * 5 + "s";

            star.style.animationDuration =
                (2 + Math.random() * 4) + "s";

            star.style.opacity =
                (0.3 + Math.random() * 0.7);

            const size = 2 + Math.random() * 3;

            star.style.width = size + "px";

            star.style.height = size + "px";

            this.starContainer.appendChild(star);

        }

    }

    /*====================================================
        HEARTS
    ====================================================*/

    createHearts(count) {

        this.heartContainer.innerHTML = "";

        const icons = [

            "❤",

            "💖",

            "💕",

            "💗",

            "💝"

        ];

        for (let i = 0; i < count; i++) {

            const heart = document.createElement("div");

            heart.className = "heart";

            heart.textContent =
                icons[Math.floor(Math.random() * icons.length)];

            heart.style.left =
                Math.random() * 100 + "%";

            heart.style.bottom =
                (-Math.random() * 100) + "px";

            heart.style.animationDelay =
                Math.random() * 10 + "s";

            heart.style.animationDuration =
                (12 + Math.random() * 10) + "s";

            heart.style.fontSize =
                (18 + Math.random() * 18) + "px";

            this.heartContainer.appendChild(heart);

        }

    }

    /*====================================================
        FLOWERS
    ====================================================*/

    createFlowers(count) {

        this.flowerContainer.innerHTML = "";

        const flowers = [

            "🌸",

            "🌺",

            "🌼"

        ];

        for (let i = 0; i < count; i++) {

            const flower = document.createElement("div");

            flower.className = "flower";

            flower.textContent =
                flowers[Math.floor(Math.random() * flowers.length)];

            flower.style.left =
                Math.random() * 100 + "%";

            flower.style.top =
                (-Math.random() * 200) + "px";

            flower.style.animationDelay =
                Math.random() * 10 + "s";

            flower.style.animationDuration =
                (15 + Math.random() * 10) + "s";

            flower.style.fontSize =
                (18 + Math.random() * 15) + "px";

            this.flowerContainer.appendChild(flower);

        }

    }

    /*====================================================
        METEORS
    ====================================================*/

    createMeteorLoop() {

        setInterval(() => {

            this.meteors.push({

                x: Math.random() * this.canvas.width,

                y: -50,

                vx: -8 - Math.random() * 8,

                vy: 8 + Math.random() * 6,

                length: 120 + Math.random() * 120,

                alpha: 1

            });

        }, 1400);

    }

    drawMeteor(meteor) {

        const ctx = this.ctx;

        ctx.beginPath();

        ctx.moveTo(meteor.x, meteor.y);

        ctx.lineTo(

            meteor.x - meteor.length,

            meteor.y - meteor.length

        );

        ctx.strokeStyle =
            `rgba(255,255,255,${meteor.alpha})`;

        ctx.lineWidth = 2;

        ctx.shadowBlur = 15;

        ctx.shadowColor = "#ffffff";

        ctx.stroke();

    }

    animate() {

        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

        this.meteors.forEach((meteor, index) => {

            meteor.x += meteor.vx;

            meteor.y += meteor.vy;

            meteor.alpha -= 0.004;

            this.drawMeteor(meteor);

            if (

                meteor.alpha <= 0 ||

                meteor.y >

                    this.canvas.height + 100 ||

                meteor.x < -300

            ) {

                this.meteors.splice(index, 1);

            }

        });

        requestAnimationFrame(() => this.animate());

    }

}