/*
==========================================================
    CONFETTI MODULE
==========================================================
*/

export class Confetti {

    constructor() {

        this.canvas = document.getElementById("confettiCanvas");

        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.confetti = [];

        this.running = false;

        this.animationId = null;

        window.addEventListener("resize", () => this.resize());

    }

    init() {

        if (!this.canvas) return;

        document.addEventListener(

            "birthdayCelebration",

            () => {

                this.start();

            }

        );

    }

    resize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

    }

    start() {

        if (this.running) return;

        this.running = true;

        this.createConfetti();

        this.animate();

    }

    createConfetti() {

        const colors = [

            "#ff4fa3",

            "#ffd54f",

            "#7b5cff",

            "#00d4ff",

            "#ffffff",

            "#7CFC00"

        ];

        this.confetti = [];

        for (let i = 0; i < 250; i++) {

            this.confetti.push({

                x: Math.random() * this.width,

                y: Math.random() * this.height - this.height,

                w: 6 + Math.random() * 8,

                h: 8 + Math.random() * 12,

                speed: 2 + Math.random() * 5,

                drift: Math.random() * 2 - 1,

                rotation: Math.random() * 360,

                rotationSpeed: Math.random() * 8,

                color: colors[Math.floor(Math.random() * colors.length)]

            });

        }

    }

    animate() {

        if (!this.running || !this.ctx) return;

        this.animationId = requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.confetti.forEach(piece => {

            piece.y += piece.speed;

            piece.x += piece.drift;

            piece.rotation += piece.rotationSpeed;

            if (piece.y > this.height + 20) {

                piece.y = -20;

                piece.x = Math.random() * this.width;

            }

            this.ctx.save();

            this.ctx.translate(piece.x, piece.y);

            this.ctx.rotate(piece.rotation * Math.PI / 180);

            this.ctx.fillStyle = piece.color;

            this.ctx.fillRect(

                -piece.w / 2,

                -piece.h / 2,

                piece.w,

                piece.h

            );

            this.ctx.restore();

        });

    }

    stop() {

        this.running = false;

        cancelAnimationFrame(this.animationId);

        this.ctx.clearRect(0, 0, this.width, this.height);

    }

}
