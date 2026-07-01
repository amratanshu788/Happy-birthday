/*
==========================================================
    CURSOR MODULE
==========================================================
*/

export class Cursor {

    constructor(){

        this.cursor = null;

        this.follower = null;

        this.x = window.innerWidth / 2;

        this.y = window.innerHeight / 2;

        this.targetX = this.x;

        this.targetY = this.y;

        this.enabled = !this.isTouchDevice();

    }

    init(){

        if(!this.enabled) return;

        this.createCursor();

        this.events();

        this.animate();

    }

    isTouchDevice(){

        return (

            "ontouchstart" in window ||

            navigator.maxTouchPoints > 0 ||

            window.innerWidth < 768

        );

    }

    createCursor(){

        this.cursor = document.createElement("div");

        this.cursor.id = "customCursor";

        this.follower = document.createElement("div");

        this.follower.id = "cursorFollower";

        document.body.appendChild(this.cursor);

        document.body.appendChild(this.follower);

    }

    events(){

        document.addEventListener(

            "mousemove",

            (e)=>{

                this.targetX = e.clientX;

                this.targetY = e.clientY;

            }

        );

        document.addEventListener(

            "mouseleave",

            ()=>{

                this.cursor.style.opacity = "0";

                this.follower.style.opacity = "0";

            }

        );

        document.addEventListener(

            "mouseenter",

            ()=>{

                this.cursor.style.opacity = "1";

                this.follower.style.opacity = "1";

            }

        );

        document.addEventListener(

            "click",

            (e)=>{

                this.spark(e.clientX,e.clientY);

            }

        );

    }

    animate(){

        this.x += (this.targetX - this.x) * .18;

        this.y += (this.targetY - this.y) * .18;

        this.cursor.style.transform =

            `translate(${this.targetX}px,${this.targetY}px)`;

        this.follower.style.transform =

            `translate(${this.x}px,${this.y}px)`;

        requestAnimationFrame(()=>this.animate());

    }
        /*
    ==========================================================
        SPARK EFFECT
    ==========================================================
    */

    spark(x,y){

        for(let i=0;i<12;i++){

            const spark=document.createElement("span");

            spark.className="cursor-spark";

            spark.style.left=x+"px";

            spark.style.top=y+"px";

            const angle=Math.random()*Math.PI*2;

            const distance=30+Math.random()*40;

            spark.style.setProperty(

                "--tx",

                Math.cos(angle)*distance+"px"

            );

            spark.style.setProperty(

                "--ty",

                Math.sin(angle)*distance+"px"

            );

            document.body.appendChild(spark);

            setTimeout(()=>{

                spark.remove();

            },700);

        }

    }

    /*
    ==========================================================
        HEART TRAIL
    ==========================================================
    */

    createHeart(){

        const heart=document.createElement("div");

        heart.className="cursor-heart";

        heart.innerHTML="❤";

        heart.style.left=this.targetX+"px";

        heart.style.top=this.targetY+"px";

        heart.style.fontSize=

            (10+Math.random()*10)+"px";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },2000);

    }

    /*
    ==========================================================
        MAGIC PARTICLES
    ==========================================================
    */

    createParticle(){

        const particle=document.createElement("div");

        particle.className="cursor-particle";

        particle.style.left=this.targetX+"px";

        particle.style.top=this.targetY+"px";

        particle.style.width=

            particle.style.height=

            (3+Math.random()*4)+"px";

        document.body.appendChild(particle);

        setTimeout(()=>{

            particle.remove();

        },1200);

    }

    /*
    ==========================================================
        FLOWERS
    ==========================================================
    */

    createFlower(){

        const flowers=[

            "🌸",

            "🌺",

            "🌼",

            "🌷"

        ];

        const flower=document.createElement("div");

        flower.className="cursor-flower";

        flower.innerHTML=

            flowers[

                Math.floor(

                    Math.random()*flowers.length

                )

            ];

        flower.style.left=this.targetX+"px";

        flower.style.top=this.targetY+"px";

        document.body.appendChild(flower);

        setTimeout(()=>{

            flower.remove();

        },2500);

    }

    /*
    ==========================================================
        TRAIL LOOP
    ==========================================================
    */

    startTrail(){

        this.trail=setInterval(()=>{

            this.createParticle();

            if(Math.random()>.55){

                this.createHeart();

            }

            if(Math.random()>.90){

                this.createFlower();

            }

        },70);

    }

    stopTrail(){

        clearInterval(this.trail);

    }
        /*
    ==========================================================
        SPARK EFFECT
    ==========================================================
    */

    spark(x,y){

        for(let i=0;i<12;i++){

            const spark=document.createElement("span");

            spark.className="cursor-spark";

            spark.style.left=x+"px";

            spark.style.top=y+"px";

            const angle=Math.random()*Math.PI*2;

            const distance=30+Math.random()*40;

            spark.style.setProperty(

                "--tx",

                Math.cos(angle)*distance+"px"

            );

            spark.style.setProperty(

                "--ty",

                Math.sin(angle)*distance+"px"

            );

            document.body.appendChild(spark);

            setTimeout(()=>{

                spark.remove();

            },700);

        }

    }

    /*
    ==========================================================
        HEART TRAIL
    ==========================================================
    */

    createHeart(){

        const heart=document.createElement("div");

        heart.className="cursor-heart";

        heart.innerHTML="❤";

        heart.style.left=this.targetX+"px";

        heart.style.top=this.targetY+"px";

        heart.style.fontSize=

            (10+Math.random()*10)+"px";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },2000);

    }

    /*
    ==========================================================
        MAGIC PARTICLES
    ==========================================================
    */

    createParticle(){

        const particle=document.createElement("div");

        particle.className="cursor-particle";

        particle.style.left=this.targetX+"px";

        particle.style.top=this.targetY+"px";

        particle.style.width=

            particle.style.height=

            (3+Math.random()*4)+"px";

        document.body.appendChild(particle);

        setTimeout(()=>{

            particle.remove();

        },1200);

    }

    /*
    ==========================================================
        FLOWERS
    ==========================================================
    */

    createFlower(){

        const flowers=[

            "🌸",

            "🌺",

            "🌼",

            "🌷"

        ];

        const flower=document.createElement("div");

        flower.className="cursor-flower";

        flower.innerHTML=

            flowers[

                Math.floor(

                    Math.random()*flowers.length

                )

            ];

        flower.style.left=this.targetX+"px";

        flower.style.top=this.targetY+"px";

        document.body.appendChild(flower);

        setTimeout(()=>{

            flower.remove();

        },2500);

    }

    /*
    ==========================================================
        TRAIL LOOP
    ==========================================================
    */

    startTrail(){

        this.trail=setInterval(()=>{

            this.createParticle();

            if(Math.random()>.55){

                this.createHeart();

            }

            if(Math.random()>.90){

                this.createFlower();

            }

        },70);

    }

    stopTrail(){

        clearInterval(this.trail);

    }
        /*
    ==========================================================
        CELEBRATION MODE
    ==========================================================
    */

    celebrationMode(){

        document.addEventListener(

            "birthdayCelebration",

            ()=>{

                this.cursor.classList.add("celebration");

                this.follower.classList.add("celebration");

                for(let i=0;i<40;i++){

                    setTimeout(()=>{

                        this.createHeart();

                        this.createParticle();

                        if(i%4===0){

                            this.createFlower();

                        }

                    },i*40);

                }

                setTimeout(()=>{

                    this.cursor.classList.remove("celebration");

                    this.follower.classList.remove("celebration");

                },3000);

            }

        );

    }

    /*
    ==========================================================
        WINDOW EVENTS
    ==========================================================
    */

    registerWindowEvents(){

        window.addEventListener("resize",()=>{

            this.x=window.innerWidth/2;

            this.y=window.innerHeight/2;

        });

        document.addEventListener("visibilitychange",()=>{

            if(document.hidden){

                this.stopTrail();

            }

            else{

                this.startTrail();

            }

        });

    }

    /*
    ==========================================================
        DESTROY
    ==========================================================
    */

    destroy(){

        this.stopTrail();

        if(this.cursor){

            this.cursor.remove();

        }

        if(this.follower){

            this.follower.remove();

        }

    }

}

/*
==========================================================
    AUTO INITIALIZE
==========================================================
*/

export function createCursor(){

    const cursor=new Cursor();

    cursor.init();

    cursor.celebrationMode();

    cursor.registerWindowEvents();

    return cursor;

}