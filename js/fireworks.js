/*
==========================================================
    FIREWORKS MODULE
==========================================================
*/

export class Fireworks {

    constructor() {

        this.canvas = document.getElementById("fireworksCanvas");

        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");

        this.width = window.innerWidth;

        this.height = window.innerHeight;

        this.canvas.width = this.width;

        this.canvas.height = this.height;

        this.fireworks = [];

        this.particles = [];

        this.running = false;
        this.interval = null;

        window.addEventListener("resize", () => this.resize());

    }

    init() {

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

        this.launchLoop();

        this.animate();

    }

    launchLoop() {

        this.interval = setInterval(() => {

            this.launch();

        },700);

    }
    stop(){

    this.running = false;

    clearInterval(this.interval);

    this.fireworks.length = 0;

    this.particles.length = 0;

}

    launch() {

        this.fireworks.push({

            x:Math.random()*this.width,

            y:this.height,

            targetY:120+Math.random()*this.height/2,

            speed:7+Math.random()*3,

            color:this.randomColor()

        });
        

    }

    explode(firework){

        for(let i=0;i<80;i++){

            const angle=Math.random()*Math.PI*2;

            const speed=Math.random()*6+2;

            this.particles.push({

                x:firework.x,

                y:firework.y,

                vx:Math.cos(angle)*speed,

                vy:Math.sin(angle)*speed,

                alpha:1,

                radius:2+Math.random()*3,

                color:firework.color,

                gravity:.05

            });

        }

    }

    randomColor(){

        const colors=[

            "#ff4fa3",

            "#ffd54f",

            "#7b5cff",

            "#00d4ff",

            "#ff6f61",

            "#7CFC00",

            "#ffffff"

        ];

        return colors[

            Math.floor(Math.random()*colors.length)

        ];

    }

    animate(){

    if(!this.running) return;

    if(!this.ctx) return;

    requestAnimationFrame(()=>this.animate());

        this.ctx.clearRect(

            0,

            0,

            this.width,

            this.height

        );

        this.fireworks.forEach((f,index)=>{

            f.y-=f.speed;

            this.ctx.beginPath();

            this.ctx.arc(

                f.x,

                f.y,

                3,

                0,

                Math.PI*2

            );

            this.ctx.fillStyle=f.color;

            this.ctx.shadowBlur=20;

            this.ctx.shadowColor=f.color;

            this.ctx.fill();

            if(f.y<=f.targetY){

                this.explode(f);

                this.fireworks.splice(index,1);

            }

        });

        this.particles.forEach((p,index)=>{

            p.x+=p.vx;

            p.y+=p.vy;

            p.vy+=p.gravity;

            p.alpha-=0.012;

            this.ctx.save();

            this.ctx.globalAlpha=p.alpha;

            this.ctx.beginPath();

            this.ctx.arc(

                p.x,

                p.y,

                p.radius,

                0,

                Math.PI*2

            );

            this.ctx.fillStyle=p.color;

            this.ctx.shadowBlur=15;

            this.ctx.shadowColor=p.color;

            this.ctx.fill();

            this.ctx.restore();

            if(p.alpha<=0){

                this.particles.splice(index,1);

            }

        });

    }

}